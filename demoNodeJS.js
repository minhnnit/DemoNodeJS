const Nightmare = require('nightmare')
const nightmare = Nightmare({show: true})

async function gotoUrl(){
	await nightmare
		.viewport(1366,768)
		.goto('https://www.smartmoderns.com')
		.click('#portable-headphones-and-technology-for-the-active-lifestyle > main > div > div > div:nth-child(4) > div:nth-child(1) > a > p')
		.click('#wireless-sport-headphones > main > div > div > div.grid-uniform.grid-link__container > div:nth-child(1) > a > p.grid-link__title')
		.click('#AddToCart')
		.wait('#vncvtw')
		.click('button[name="checkout"]')
		.wait('#countdownhere')
	
}
async function  typeCoupon(Coupon) {
	await nightmare
		.insert('#checkout_reduction_code',Coupon)
		.click('#order-summary > div > div.order-summary__section.order-summary__section--discount > form:nth-child(3) > div > div > div > button')
		.wait(5000)
		.type('#checkout_reduction_code',null)
		.evaluate(function() {
			var obj = {};
			obj.Price = document.querySelectorAll('.total-line__price .order-summary__emphasis')[0].textContent.replace("$","");
			obj.DiscountPrice = document.querySelector('.payment-due__price').textContent.replace("$","");
			obj.TotalPrice = parseFloat(obj.Price) - parseFloat(obj.DiscountPrice);
			
			obj.valid = 1;
			if(document.querySelector('#error-for-reduction_code') !== null){
				obj.valid = 0;
			}
			return obj;
		  
      }).then(function(rs) {
		  if(rs.TotalPrice > 0){
			  console.log(Coupon + " : Code apply successfully" +"-"+ "Discount Amount :" + rs.TotalPrice);
		  }
		  else if(!rs.valid) {
			  console.log(Coupon + ": Invalid code"); 
		  }
		 
	  });
}

async function main() {
	const CouponArr = [ 'CAINAYKHONGDUOC', 'CAINAYKHONGDUOCNOT', 'SPECIAL10', 'SPECIAL15' ]
	await gotoUrl();
		for(let couponCode of CouponArr) {
			await typeCoupon(couponCode)
		}
	await nightmare.end()
	}
	
	main();
	