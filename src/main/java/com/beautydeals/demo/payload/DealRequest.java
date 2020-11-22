package com.beautydeals.demo.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;

public class DealRequest {
    @NotBlank
    @Size(max = 40)
    private String dealDescription;

    @NotBlank
    @Size(max = 40)
    private String seller;

    @NotBlank
    @Size(max = 10)
    private String discountPrice;

    @NotBlank
    @Size(max = 10)
    private String discount;

    private Date startDate;

    private Date expireDate;

    public String getDealDescription() {
        return dealDescription;
    }
    public void setDealDescription(String dealDescription) {
        this.dealDescription = dealDescription;
    }

    public String getSeller() { return seller; }

    public void setSeller(String seller) { this.seller = seller; }

    public String getDiscountPrice() { return discountPrice; }

    public void setDiscountPrice(String discountPrice) { this.discountPrice = discountPrice; }

    public String getDiscount() { return discount; }

    public void setDiscount(String discount) { this.discount = discount; }

    public Date getStartDate() { return startDate; }

    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getExpireDate() { return expireDate; }

    public void setExpireDate(Date expireDate) { this.expireDate = expireDate; }

}
