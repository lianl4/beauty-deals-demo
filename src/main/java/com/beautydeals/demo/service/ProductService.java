package com.beautydeals.demo.service;

import com.beautydeals.demo.exception.BadRequestException;
import com.beautydeals.demo.exception.ResourceNotFoundException;
import com.beautydeals.demo.model.*;
import com.beautydeals.demo.payload.*;
import com.beautydeals.demo.repository.*;
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
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

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

    public PagedResponse<ProductResponse> getDealsFavoritedBy(String username, UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        // 1. get user id from userRepository
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        // 2.1. Retrieve all productIds in which the given username has favorited
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Long> userFavoriteProductIds = favoriteRepository.findFavoriteProductIdsByUserId(user.getId(), pageable);
        // 2.2. Retrieve all dealIds in which the given username has favorited
        Page<Long> userFavoriteDealIds = favoriteRepository.findFavoriteDealIdsByUserId(user.getId(), pageable);

        if (userFavoriteProductIds.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), userFavoriteProductIds.getNumber(),
                    userFavoriteProductIds.getSize(), userFavoriteProductIds.getTotalElements(),
                    userFavoriteProductIds.getTotalPages(), userFavoriteProductIds.isLast());
        }

        // 3. Retrieve all products and deals details from the favorited productIds and dealIds.
        List<Long> productIds = userFavoriteProductIds.getContent();
        Sort sortProducts = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Product> products = productRepository.findByIdIn(productIds, sortProducts);

        List<Long> dealIds = userFavoriteDealIds.getContent();
        Sort sortDeals = Sort.by(Sort.Direction.DESC, "productId");
        List<Deal> deals = dealRepository.findByIdIn(dealIds, sortDeals);

        class Pair {
            Product product;
            Deal deal;
        }

        List<Pair> pairs = new ArrayList<>();
        int i = 0;
        for (Product product : products) {
            Pair pair = new Pair();
            pair.product = product;
            pair.deal = deals.get(i);
            pairs.add(pair);
            i++;
        }

        // Map Products to ProductResponses containing approval counts and product creator details
        Map<Long, Long> dealApprovalCountMap = getDealApprovalCountMap(productIds);
        Map<Long, Long> productUserApprovalMap = getProductUserApprovalMap(currentUser, productIds);
        Map<Long, User> creatorMap = getProductCreatorMap(products);

        List<ProductResponse> productResponses = pairs.stream().map(favorite -> ModelMapper.mapProductToProductFavoritedDealsResponse(favorite.product, favorite.deal,
                dealApprovalCountMap,
                creatorMap.get(favorite.product.getCreatedBy()),
                productUserApprovalMap  == null ? null : productUserApprovalMap.getOrDefault(favorite.product.getId(), null))).collect(Collectors.toList());

        return new PagedResponse<>(productResponses, userFavoriteProductIds.getNumber(), userFavoriteProductIds.getSize(), userFavoriteProductIds.getTotalElements(), userFavoriteProductIds.getTotalPages(), userFavoriteProductIds.isLast());
    }

    public ProductResponse getProductByProductDescription(String productDescription, UserPrincipal currentUser) {
        Product product = productRepository.findByProductDescription(productDescription).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productDescription", productDescription));

        // Retrieve Approval Counts of every deal belonging to the current product
        List<DealApprovalCount> approvals = approvalRepository.countByProductDescriptionGroupByDealId(productDescription);

        Map<Long, Long> dealApprovalsMap = approvals.stream()
                .collect(Collectors.toMap(DealApprovalCount::getDealId, DealApprovalCount::getApprovalCount));

        // Retrieve product creator details
        User creator = userRepository.findById(product.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", product.getCreatedBy()));

        return ModelMapper.mapProductToProductResponse(product, dealApprovalsMap,
                creator, null);
    }

    public Product createProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setProductDescription(productRequest.getProductDescription());

        String productDescription = productRequest.getProductDescription();
        if (productRepository.findByProductDescription(productDescription).isPresent()) {
            product = productRepository.findByProductDescription(productDescription).orElseThrow(
                    () -> new ResourceNotFoundException("Product", "productDescription", productDescription));
        }

        Product finalProduct = product;
        productRequest.getDeals().forEach(dealRequest -> {
            finalProduct.addDeal(new Deal(dealRequest.getDealDescription(), dealRequest.getDiscount(), dealRequest.getDiscountPrice(), dealRequest.getSeller(), dealRequest.getStartDate(), dealRequest.getExpireDate()));
        });

        Instant now = Instant.now();
        Instant expirationDateTime = now.plus(Duration.ofDays(productRequest.getProductLength().getDays()))
                .plus(Duration.ofHours(productRequest.getProductLength().getHours()));

        product.setExpirationDateTime(expirationDateTime);

        return productRepository.save(finalProduct);
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

    public ProductResponse castFavoriteAndGetUpdatedProduct(Long productId, FavoriteRequest favoriteRequest, UserPrincipal currentUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        if(product.getExpirationDateTime().isBefore(Instant.now())) {
            throw new BadRequestException("Sorry! This Product has already expired");
        }

        User user = userRepository.getOne(currentUser.getId());

        Deal selectedDeal = product.getDeals().stream()
                .filter(deal -> deal.getId().equals(favoriteRequest.getDealId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Deal", "id", favoriteRequest.getDealId()));

        Favorite favorite = new Favorite();
        favorite.setProduct(product);
        favorite.setUser(user);
        favorite.setDeal(selectedDeal);

        try {
            favorite = favoriteRepository.save(favorite);
        } catch (DataIntegrityViolationException ex) {
            logger.info("User {} has already favorited in Product {}", currentUser.getId(), productId);
            throw new BadRequestException("Sorry! You have already cast your favorite in this product");
        }

        //-- Favorite Saved, Return the updated Product Response now --

        // Retrieve Favorite Counts of every deal belonging to the current product
        List<DealApprovalCount> approvals = approvalRepository.countByProductIdGroupByDealId(productId);

        Map<Long, Long> dealApprovalsMap = approvals.stream()
                .collect(Collectors.toMap(DealApprovalCount::getDealId, DealApprovalCount::getApprovalCount));

        // Retrieve product creator details
        User creator = userRepository.findById(product.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", product.getCreatedBy()));

        return ModelMapper.mapProductToProductResponse(product, dealApprovalsMap, creator, favorite.getDeal().getId());
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
