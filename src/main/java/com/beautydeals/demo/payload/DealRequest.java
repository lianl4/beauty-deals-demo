package com.beautydeals.demo.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class DealRequest {
    @NotBlank
    @Size(max = 40)
    private String dealDescription;

    public String getDealDescription() {
        return dealDescription;
    }

    public void setDealDescription(String dealDescription) {
        this.dealDescription = dealDescription;
    }
}
