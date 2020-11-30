package com.beautydeals.demo.controller;

import com.beautydeals.demo.model.*;
import com.beautydeals.demo.payload.*;
import com.beautydeals.demo.repository.ProductRepository;
import com.beautydeals.demo.repository.UserRepository;
import com.beautydeals.demo.repository.ApprovalRepository;
import com.beautydeals.demo.security.CurrentUser;
import com.beautydeals.demo.security.UserPrincipal;
import com.beautydeals.demo.service.ProductService;
import com.beautydeals.demo.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @GetMapping
    public PagedResponse<ProductResponse> getProducts(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return productService.getAllProducts(currentUser, page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequest productRequest) {
        Product product = productService.createProduct(productRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{productId}")
                .buildAndExpand(product.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Product Created Successfully"));
    }


    @GetMapping("/{productId}")
    public ProductResponse getProductById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long productId) {
        return productService.getProductById(productId, currentUser);
    }

    @GetMapping("/descriptions/{productDescription}")
    public ProductResponse getProductByProductDescription(@CurrentUser UserPrincipal currentUser,
                                                          @PathVariable String productDescription) {
        return productService.getProductByProductDescription(productDescription, currentUser);
    }

    @PostMapping("/{productId}/approvals")
    @PreAuthorize("hasRole('USER')")
    public ProductResponse castApproval(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long productId,
                         @Valid @RequestBody ApprovalRequest approvalRequest) {
        return productService.castApprovalAndGetUpdatedProduct(productId, approvalRequest, currentUser);
    }

    @PostMapping("/{productId}/favorite")
    @PreAuthorize("hasRole('USER')")
    public ProductResponse castFavorite(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long productId,
                         @Valid @RequestBody FavoriteRequest favoriteRequest) {
        return productService.castFavoriteAndGetUpdatedProduct(productId, favoriteRequest, currentUser);
    }

}
