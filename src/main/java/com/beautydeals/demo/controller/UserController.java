package com.beautydeals.demo.controller;

import com.beautydeals.demo.exception.ResourceNotFoundException;
import com.beautydeals.demo.model.User;
import com.beautydeals.demo.payload.*;
import com.beautydeals.demo.repository.ProductRepository;
import com.beautydeals.demo.repository.UserRepository;
import com.beautydeals.demo.repository.ApprovalRepository;
import com.beautydeals.demo.security.UserPrincipal;
import com.beautydeals.demo.service.ProductService;
import com.beautydeals.demo.security.CurrentUser;
import com.beautydeals.demo.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private ProductService productService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long productCount = productRepository.countByCreatedBy(user.getId());
        long approvalCount = approvalRepository.countByUserId(user.getId());

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), productCount, approvalCount);

        return userProfile;
    }

    @GetMapping("/users/{username}/products")
    public PagedResponse<ProductResponse> getProductsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser UserPrincipal currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return productService.getProductsCreatedBy(username, currentUser, page, size);
    }


    @GetMapping("/users/{username}/approvals")
    public PagedResponse<ProductResponse> getProductsApprovaldBy(@PathVariable(value = "username") String username,
                                                       @CurrentUser UserPrincipal currentUser,
                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return productService.getProductsApprovaldBy(username, currentUser, page, size);
    }

    @GetMapping("users/{username}/favorites")
    public PagedResponse<ProductResponse> getDealsFavoritedBy(@PathVariable(value = "username") String username,
                                                              @CurrentUser UserPrincipal currentUser,
                                                              @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                              @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return productService.getDealsFavoritedBy(username, currentUser, page, size);
    }

}
