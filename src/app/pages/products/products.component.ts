import { Component, inject, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core/product.service';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';
import { AffiliateService } from '../../core/affiliate.service';
import { TransactionService } from '../../core/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private affiliateService = inject(AffiliateService);
  private transactionService = inject(TransactionService);

  products: Product[] = [];
  userRole: string = '';
  userId: string = '';
  isAddModalOpen = false;
  isBuyModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  isPromoteProductModalOpen = false;
  selectedProduct: Product | null = null;
  affiliateId: string = '';
  affiliates: any[] = [];
  isLoading = false;
  affiliateData: any = {};

  newProduct = {
    name: '',
    price: 0,
    description: '',
  };

  ngOnInit() {
    const user = this.authService.getUser();
    this.userRole = user?.role || '';
    this.userId = user?.id || '';
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    if (this.userRole === 'merchant') {
      this.productService
        .getProductsByMerchantId(this.userId)
        .subscribe((res) => {
          this.products = res;
        });
    } else {
      this.productService.getAllProducts().subscribe((res) => {
        this.products = res.data;
      });
    }
    this.isLoading = false;
  }

  loadAffiliates() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.affiliates = response.data.filter(
          (user) => user.role === 'affiliate' || user.role === 'admin'
        );
      },
    });
  }

  openBuyModal(product: Product) {
    this.loadAffiliates();
    this.selectedProduct = product;
    this.isBuyModalOpen = true;
  }

  closeBuyModal() {
    this.isBuyModalOpen = false;
    this.selectedProduct = null;
  }

  openPromoteProductModal() {
    this.isLoading = true;
    this.isPromoteProductModalOpen = true;
  }

  closePromoteProductModal() {
    this.isPromoteProductModalOpen = false;
    this.selectedProduct = null;
  }

  createAffiliateLink(product: Product) {
    this.openPromoteProductModal();
    this.affiliateService.getAllAffiliateLinks().subscribe({
      next: (response) => {
        let existingAffiliateLink = response.data.find(
          (link) =>
            link.productId === product.id &&
            link.affiliateId === this.userId
        );

        if (!existingAffiliateLink) {
          this.affiliateService
            .createAffiliateLink({ productId: product.id! })
            .subscribe({
              next: (newAffiliateResponse) => {
                console.log(
                  'Affiliate link created:',
                  newAffiliateResponse.data
                );
                this.affiliateData = newAffiliateResponse.data;
                this.isLoading = false;
              },
              error: (err) => {
                console.error('Error creating affiliate link:', err);
              },
            });
        } else {
          this.isLoading = false;
          this.affiliateData = existingAffiliateLink;
        }
      },
      error: (err) => {
        console.error('Error fetching affiliate links:', err);
      },
    });
  }

  copyAffiliateLink(affiliateLink: string) {
    navigator.clipboard.writeText(affiliateLink);
  }

  buyProduct(product: Product) {
    this.affiliateService.getAllAffiliateLinks().subscribe({
      next: (response) => {
        let existingAffiliateLink = response.data.find(
          (link) =>
            link.productId === product.id &&
            link.affiliateId === this.affiliateId
        );

        if (existingAffiliateLink) {
          this.createTransaction(existingAffiliateLink.id);
        } else {
          this.affiliateService
            .createAffiliateLink({ productId: product.id! })
            .subscribe({
              next: (newAffiliateResponse) => {
                const newAffiliateLink = newAffiliateResponse.data;
                this.createTransaction(newAffiliateLink.id);
              },
              error: (err) => {
                console.error('Error creating affiliate link:', err);
              },
            });
        }
      },
      error: (err) => {
        console.error('Error fetching affiliate links:', err);
      },
    });

    this.closeBuyModal();
  }

  createTransaction(affiliateLinkId: string) {
    this.transactionService.createTransaction(affiliateLinkId).subscribe({
      next: (transactionResponse) => {
        console.log('Transaction created:', transactionResponse.data);
      },
      error: (err) => {
        console.error('Error creating transaction:', err);
      },
    });
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  openUpdateModal(product: Product) {
    this.selectedProduct = { ...product };
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.selectedProduct = null;
  }

  openDeleteModal(product: Product) {
    this.selectedProduct = product;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.selectedProduct = null;
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.closeAddModal();
      this.loadProducts();
    });
  }

  updateProduct() {
    const product = this.selectedProduct;
    this.productService.updateProduct(product!.id, product!).subscribe(() => {
      this.closeUpdateModal();
      this.loadProducts();
    });
  }

  deleteProduct() {
    const product = this.selectedProduct;
    this.productService.deleteProduct(product!.id).subscribe(() => {
      this.closeDeleteModal();
      this.loadProducts();
    });
  }
}
