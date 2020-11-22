package com.beautydeals.demo.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Objects;


@Entity
@Table(name = "deals")
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Deal() {

    }

    public Deal(String dealDescription, String discount, String discountPrice, String seller, Date startDate, Date expireDate) {
        this.dealDescription = dealDescription;
        this.discount = discount;
        this.discountPrice = discountPrice;
        this.expireDate = expireDate;
        this.seller = seller;
        this.startDate = startDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Deal deal = (Deal) o;
        return Objects.equals(id, deal.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
