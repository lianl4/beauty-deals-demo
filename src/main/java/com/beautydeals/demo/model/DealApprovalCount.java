package com.beautydeals.demo.model;

public class DealApprovalCount {
    private Long dealId;
    private Long approvalCount;

    public DealApprovalCount(Long dealId, Long approvalCount) {
        this.dealId = dealId;
        this.approvalCount = approvalCount;
    }

    public Long getDealId() {
        return dealId;
    }

    public void setDealId(Long dealId) {
        this.dealId = dealId;
    }

    public Long getApprovalCount() {
        return approvalCount;
    }

    public void setApprovalCount(Long approvalCount) {
        this.approvalCount = approvalCount;
    }
}

