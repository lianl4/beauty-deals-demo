package com.beautydeals.demo.payload;
import com.sun.istack.NotNull;

public class FavoriteRequest {
    @NotNull
    private Long dealId;

    public Long getDealId() {
        return dealId;
    }

    public void setDealId(Long dealId) {
        this.dealId = dealId;
    }
}
