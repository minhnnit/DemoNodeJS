const  Nightmare = require('nightmare')

async function typeCoupon(Coupon) {
	await nightmare
		.type('#coupon_code',Coupon);
		.click('#main > div.cart-container.container.page-wrapper.page-checkout > div > form.checkout_coupon.woocommerce-form-coupon.has-border.is-dashed > div > div > div:nth-child(2) > button')
		.wait(5000)
		.evaluate(function(){
			var obj = {};
			obj.valid = 0;
			if(document.querySelector('#main > div.cart-container.container.page-wrapper.page-checkout > div > div.woocommerce-message.message-wrapper > div') !== null){
				obj.valid = 1
			}
			return obj;
		});
}

async function gotoUrl(){
	 await nightmare
		.viewport(1366,768)
		.goto('https://vape-smart.com/')
		.click('#popmake-15498 > div.pum-content.popmake-content > div > div > div.pum-field.pum-field-button.pum-field-age_enter > button')
		.click('#content > div.row.large-columns-5.medium-columns-3.small-columns-2.row-small.slider.row-slider.slider-nav-reveal.slider-nav-push.flickity-enabled > div > div > div.product-small.col.has-hover.post-105197.product.type-product.status-publish.has-post-thumbnail.product_cat-vaporizers.product_cat-dry-herb.product_cat-portable.product_cat-concentrate.first.instock.taxable.shipping-taxable.purchasable.product-type-variable.is-selected > div > div.product-small.box > div.box-text.box-text-products.text-center.grid-style-2 > div.add-to-cart-button > a')
		.click('#product-105197 > div > div.product-main > div > div.product-info.summary.col-fit.col.entry-summary.product-summary.text-left.form-flat > form > div > div.woocommerce-variation-add-to-cart.variations_button.woocommerce-variation-add-to-cart-enabled > button')
		.wait(5000)
		.click('#masthead > div.header-inner.flex-row.container.logo-center.medium-logo-center > div.flex-col.hide-for-medium.flex-right > ul > li.cart-item.has-icon.has-dropdown > a > span.cart-icon.image-icon > strong')
		.wait(5000)
		.click('#main > div.cart-container.container.page-wrapper.page-checkout > div > div.woocommerce.row.row-large.row-divided > div.cart-collaterals.large-5.col.pb-0 > div > div.cart_totals > div > a')
		.wait(3000)
		.click('#main > div.cart-container.container.page-wrapper.page-checkout > div > div.woocommerce-form-coupon-toggle > div > div > a')
	
}

async function main() {
	const nightmare = Nightmare({ show: true})
	const CouponArr = ['CAINAYKHONGDUOC','spend100get20']
	console.log(123);
	gotoUrl();
		for(let couponCode of CouponArr ) {
			typeCoupon(couponCode)
		}
}

main();