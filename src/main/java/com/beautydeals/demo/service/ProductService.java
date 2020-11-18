package com.beautydeals.demo.service;

import com.beautydeals.demo.exception.BadRequestException;
import com.beautydeals.demo.exception.ResourceNotFoundException;
import com.beautydeals.demo.model.*;
import com.beautydeals.demo.payload.PagedResponse;
import com.beautydeals.demo.payload.ProductRequest;
import com.beautydeals.demo.payload.ProductResponse;
import com.beautydeals.demo.payload.ApprovalRequest;
import com.beautydeals.demo.repository.ProductRepository;
import com.beautydeals.demo.repository.UserRepository;
import com.beautydeals.demo.repository.ApprovalRepository;
import com.beautydeals.demo.security.UserPrincipal;
import com.beautydeals.demo.util.AppConstants;
import com.beautydeals.demo.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    public PagedResponse<ProductResponse> getAllProducts(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Products
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Product> products = productRepository.findAll(pageable);

        if(products.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), products.getNumber(),
                    products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
        }

        // Map Products to ProductResponses containing approval counts and product creator details
        List<Long> productIds = products.map(Product::getId).getContent();
        Map<Long, Long> dealApprovalCountMap = getDealApprovalCountMap(productIds);
        Map<Long, Long> productUserApprovalMap = getProductUserApprovalMap(currentUser, productIds);
        Map<Long, User> creatorMap = getProductCreatorMap(products.getContent());

        List<ProductResponse> productResponses = products.map(product -> {
            return ModelMapper.mapProductToProductResponse(product,
                    dealApprovalCountMap,
                    creatorMap.get(product.getCreatedBy()),
                    productUserApprovalMap == null ? null : productUserApprovalMap.getOrDefault(product.getId(), null));
        }).getContent();

        return new PagedResponse<>(productResponses, products.getNumber(),
                products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
    }

    public PagedResponse<ProductResponse> getProductsCreatedBy(String username, UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        // Retrieve all products created by the given username
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Product> products = productRepository.findByCreatedBy(user.getId(), pageable);

        if (products.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), products.getNumber(),
                    products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
        }

        // Map Products to ProductResponses containing approval counts and product creator details
        List<Long> productIds = products.map(Product::getId).getContent();
        Map<Long, Long> dealApprovalCountMap = getDealApprovalCountMap(productIds);
        Map<Long, Long> productUserApprovalMap = getProductUserApprovalMap(currentUser, productIds);

        List<ProductResponse> productResponses = products.map(product -> {
            return ModelMapper.mapProductToProductResponse(product,
                    dealApprovalCountMap,
                    user,
                    productUserApprovalMap == null ? null : productUserApprovalMap.getOrDefault(product.getId(), null));
        }).getContent();

        return new PagedResponse<>(productResponses, products.getNumber(),
                products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
    }

    public PagedResponse<ProductResponse> getProductsApprovaldBy(String username, UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        // Retrieve all productIds in which the given username has approved
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Long> userApprovaldProductIds = approvalRepository.findApprovaldProductIdsByUserId(user.getId(), pageable);

        if (userApprovaldProductIds.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), userApprovaldProductIds.getNumber(),
                    userApprovaldProductIds.getSize(), userApprovaldProductIds.getTotalElements(),
                    userApprovaldProductIds.getTotalPages(), userApprovaldProductIds.isLast());
        }

        // Retrieve all product details from the approved productIds.
        List<Long> productIds = userApprovaldProductIds.getContent();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Product> products = productRepository.findByIdIn(productIds, sort);

        // Map Products to ProductResponses containing approval counts and product creator details
        Map<Long, Long> dealApprovalCountMap = getDealApprovalCountMap(productIds);
        Map<Long, Long> productUserApprovalMap = getProductUserApprovalMap(currentUser, productIds);
        Map<Long, User> creatorMap = getProductCreatorMap(products);

        List<ProductResponse> productResponses = products.stream().map(product -> {
            return ModelMapper.mapProductToProductResponse(product,
                    dealApprovalCountMap,
                    creatorMap.get(product.getCreatedBy()),
                    productUserApprovalMap == null ? null : productUserApprovalMap.getOrDefault(product.getId(), null));
        }).collect(Collectors.toList());

        return new PagedResponse<>(productResponses, userApprovaldProductIds.getNumber(), userApprovaldProductIds.getSize(), userApprovaldProductIds.getTotalElements(), userApprovaldProductIds.getTotalPages(), userApprovaldProductIds.isLast());
    }


    public Product createProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setProductDescription(productRequest.getProductDescription());

        productRequest.getDeals().forEach(dealRequest -> {
            product.addDeal(new Deal(dealRequest.getDealDescription()));
        });

        Instant now = Instant.now();
        Instant expirationDateTime = now.plus(Duration.ofDays(productRequest.getProductLength().getDays()))
                .plus(Duration.ofHours(productRequest.getProductLength().getHours()));

        product.setExpirationDateTime(expirationDateTime);

        return productRepository.save(product);
    }

    public ProductResponse getProductById(Long productId, UserPrincipal currentUser) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "id", productId));

        // Retrieve Approval Counts of every deal belonging to the current product
        List<DealApprovalCount> approvals = approvalRepository.countByProductIdGroupByDealId(productId);

        Map<Long, Long> dealApprovalsMap = approvals.stream()
                .collect(Collectors.toMap(DealApprovalCount::getDealId, DealApprovalCount::getApprovalCount));

        // Retrieve product creator details
        User creator = userRepository.findById(product.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", product.getCreatedBy()));

        // Retrieve approval done by logged in user
        Approval userApproval = null;
        if(currentUser != null) {
            userApproval = approvalRepository.findByUserIdAndProductId(currentUser.getId(), productId);
        }

        return ModelMapper.mapProductToProductResponse(product, dealApprovalsMap,
                creator, userApproval != null ? userApproval.getDeal().getId(): null);
    }

    public ProductResponse castApprovalAndGetUpdatedProduct(Long productId, ApprovalRequest approvalRequest, UserPrincipal currentUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        if(product.getExpirationDateTime().isBefore(Instant.now())) {
            throw new BadRequestException("Sorry! This Product has already expired");
        }

        User user = userRepository.getOne(currentUser.getId());

        Deal selectedDeal = product.getDeals().stream()
                .filter(deal -> deal.getId().equals(approvalRequest.getDealId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Deal", "id", approvalRequest.getDealId()));

        Approval approval = new Approval();
        approval.setProduct(product);
        approval.setUser(user);
        approval.setDeal(selectedDeal);

        try {
            approval = approvalRepository.save(approval);
        } catch (DataIntegrityViolationException ex) {
            logger.info("User {} has already approved in Product {}", currentUser.getId(), productId);
            throw new BadRequestException("Sorry! You have already cast your approval in this product");
        }

        //-- Approval Saved, Return the updated Product Response now --

        // Retrieve Approval Counts of every deal belonging to the current product
        List<DealApprovalCount> approvals = approvalRepository.countByProductIdGroupByDealId(productId);

        Map<Long, Long> dealApprovalsMap = approvals.stream()
                .collect(Collectors.toMap(DealApprovalCount::getDealId, DealApprovalCount::getApprovalCount));

        // Retrieve product creator details
        User creator = userRepository.findById(product.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", product.getCreatedBy()));

        return ModelMapper.mapProductToProductResponse(product, dealApprovalsMap, creator, approval.getDeal().getId());
    }


    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    private Map<Long, Long> getDealApprovalCountMap(List<Long> productIds) {
        // Retrieve Approval Counts of every Deal belonging to the given productIds
        List<DealApprovalCount> approvals = approvalRepository.countByProductIdInGroupByDealId(productIds);

        Map<Long, Long> dealApprovalsMap = approvals.stream()
                .collect(Collectors.toMap(DealApprovalCount::getDealId, DealApprovalCount::getApprovalCount));

        return dealApprovalsMap;
    }

    private Map<Long, Long> getProductUserApprovalMap(UserPrincipal currentUser, List<Long> productIds) {
        // Retrieve Approvals done by the logged in user to the given productIds
        Map<Long, Long> productUserApprovalMap = null;
        if(currentUser != null) {
            List<Approval> userApprovals = approvalRepository.findByUserIdAndProductIdIn(currentUser.getId(), productIds);

            productUserApprovalMap = userApprovals.stream()
                    .collect(Collectors.toMap(approval -> approval.getProduct().getId(), approval -> approval.getDeal().getId()));
        }
        return productUserApprovalMap;
    }

    Map<Long, User> getProductCreatorMap(List<Product> products) {
        // Get Product Creator details of the given list of products
        List<Long> creatorIds = products.stream()
                .map(Product::getCreatedBy)
                .distinct()
                .collect(Collectors.toList());

        List<User> creators = userRepository.findByIdIn(creatorIds);
        Map<Long, User> creatorMap = creators.stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));

        return creatorMap;
    }
}
