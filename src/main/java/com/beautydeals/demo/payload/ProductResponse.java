package com.beautydeals.demo.payload;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

public class ProductResponse {
    private Long id;
    private String productDescription;
    private List<DealResponse> deals;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private Instant expirationDateTime;
    private Boolean isExpired;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long selectedDeal;
    private Long totalApprovals;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public List<DealResponse> getDeals() {
        return deals;
    }

    public void setDeals(List<DealResponse> deals) {
        this.deals = deals;
    }

    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }


    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public Instant getExpirationDateTime() {
        return expirationDateTime;
    }

    public void setExpirationDateTime(Instant expirationDateTime) {
        this.expirationDateTime = expirationDateTime;
    }

    public Boolean getExpired() {
        return isExpired;
    }

    public void setExpired(Boolean expired) {
        isExpired = expired;
    }

    public Long getSelectedDeal() {
        return selectedDeal;
    }

    public void setSelectedDeal(Long selectedDeal) {
        this.selectedDeal = selectedDeal;
    }

    public Long getTotalApprovals() {
        return totalApprovals;
    }

    public void setTotalApprovals(Long totalApprovals) {
        this.totalApprovals = totalApprovals;
    }
}
