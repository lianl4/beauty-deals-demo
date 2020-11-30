package com.beautydeals.demo.util;

import com.beautydeals.demo.model.Deal;
import com.beautydeals.demo.model.Product;
import com.beautydeals.demo.model.User;
import com.beautydeals.demo.payload.DealResponse;
import com.beautydeals.demo.payload.ProductResponse;
import com.beautydeals.demo.payload.UserSummary;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ModelMapper {

    public static ProductResponse mapProductToProductResponse(Product product, Map<Long, Long> dealApprovalsMap, User creator, Long userApproval) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setProductDescription(product.getProductDescription());
        productResponse.setCreationDateTime(product.getCreatedAt());
        productResponse.setExpirationDateTime(product.getExpirationDateTime());
        Instant now = Instant.now();
        productResponse.setExpired(product.getExpirationDateTime().isBefore(now));

        List<DealResponse> dealResponses = product.getDeals().stream().map(deal -> {
            DealResponse dealResponse = new DealResponse();
            dealResponse.setId(deal.getId());
            dealResponse.setDealDescription(deal.getDealDescription());
            dealResponse.setDiscount(deal.getDiscount());
            dealResponse.setDiscountPrice(deal.getDiscountPrice());
            dealResponse.setSeller(deal.getSeller());
            dealResponse.setStartDate(deal.getStartDate());
            dealResponse.setExpireDate(deal.getExpireDate());

            if(dealApprovalsMap.containsKey(deal.getId())) {
                dealResponse.setApprovalCount(dealApprovalsMap.get(deal.getId()));
            } else {
                dealResponse.setApprovalCount(0);
            }
            return dealResponse;
        }).collect(Collectors.toList());

        productResponse.setDeals(dealResponses);
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        productResponse.setCreatedBy(creatorSummary);

        if(userApproval != null) {
            productResponse.setSelectedDeal(userApproval);
        }

        long totalApprovals = productResponse.getDeals().stream().mapToLong(DealResponse::getApprovalCount).sum();
        productResponse.setTotalApprovals(totalApprovals);

        return productResponse;
    }

    public static ProductResponse mapProductToProductFavoritedDealsResponse(Product product, Deal deal, Map<Long, Long> dealApprovalsMap, User creator, Long userApproval) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setProductDescription(product.getProductDescription());
        productResponse.setCreationDateTime(product.getCreatedAt());
        productResponse.setExpirationDateTime(product.getExpirationDateTime());
        Instant now = Instant.now();
        productResponse.setExpired(product.getExpirationDateTime().isBefore(now));

        DealResponse dealResponse = new DealResponse();
        dealResponse.setId(deal.getId());
        dealResponse.setDealDescription(deal.getDealDescription());
        dealResponse.setDiscount(deal.getDiscount());
        dealResponse.setDiscountPrice(deal.getDiscountPrice());
        dealResponse.setSeller(deal.getSeller());
        dealResponse.setStartDate(deal.getStartDate());
        dealResponse.setExpireDate(deal.getExpireDate());

        if(dealApprovalsMap.containsKey(deal.getId())) {
            dealResponse.setApprovalCount(dealApprovalsMap.get(deal.getId()));
        } else {
            dealResponse.setApprovalCount(0);
        }

        List<DealResponse> dealResponses = new ArrayList<>();
        dealResponses.add(dealResponse);

        productResponse.setDeals(dealResponses);

        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        productResponse.setCreatedBy(creatorSummary);

        if(userApproval != null) {
            productResponse.setSelectedDeal(userApproval);
        }

        long totalApprovals = productResponse.getDeals().stream().mapToLong(DealResponse::getApprovalCount).sum();
        productResponse.setTotalApprovals(totalApprovals);

        return productResponse;
    }

}
