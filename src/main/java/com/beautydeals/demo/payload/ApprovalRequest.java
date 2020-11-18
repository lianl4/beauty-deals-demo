package com.beautydeals.demo.payload;
import javax.validation.constraints.NotNull;

public class ApprovalRequest {
    @NotNull
    private Long dealId;

    public Long getDealId() {
        return dealId;
    }

    public void setDealId(Long dealId) {
        this.dealId = dealId;
    }
}

