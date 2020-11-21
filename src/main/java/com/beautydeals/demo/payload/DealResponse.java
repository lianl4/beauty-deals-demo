package com.beautydeals.demo.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;

public class DealResponse {
    private long id;
    private String dealDescription;
    private String seller;
    private String discountPrice;
    private String discount;
    private Date startDate;
    private Date expireDate;

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
