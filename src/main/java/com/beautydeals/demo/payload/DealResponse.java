package com.beautydeals.demo.payload;

public class DealResponse {
    private long id;
    private String dealDescription;
    private long approvalCount;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDealDescription() {
        return dealDescription;
    }

    public void setDealDescription(String dealDescription) {
        this.dealDescription = dealDescription;
    }

    public long getApprovalCount() {
        return approvalCount;
    }

    public void setApprovalCount(long approvalCount) {
        this.approvalCount = approvalCount;
    }

}
