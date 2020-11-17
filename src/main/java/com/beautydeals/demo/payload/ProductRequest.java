package com.beautydeals.demo.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ProductRequest {
    @NotBlank
    @Size(max = 140)
    private String productDescription;

    @NotNull
    @Size(min = 2, max = 6)
    @Valid
    private List<DealRequest> deals;

    @NotNull
    @Valid
    private ProductLength productLength;

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public List<DealRequest> getDeals() {
        return deals;
    }

    public void setDeals(List<DealRequest> deals) {
        this.deals = deals;
    }

    public ProductLength getProductLength() {
        return productLength;
    }

    public void setProductLength(ProductLength productLength) {
        this.productLength = productLength;
    }
}
