const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
	const nightmare = Nightmare({ show: true})
	const CouponArr = [ 'CAINAYKHONGDUOC', 'CAINAYKHONGDUOCNOT', 'SPECIAL10', 'SPECIAL15' ]
	const results = []
	
	for(let i = 0; i < CouponArr.length; i++){
		const c = CouponArr[i]
		
		const CouponApply = await nightmare
		.viewport(1366,768)
		.goto('https://www.smartmoderns.com')
		.click('.grid-link__title')
		.click('.grid-link__title')
		.click('#AddToCart')
		.wait(5000)
		.click('button[name="checkout"]')
		.wait(5000)
		.type('#checkout_reduction_code',c)
		.click('#order-summary > div > div.order-summary__section.order-summary__section--discount > form:nth-child(3) > div > div > div > button')
		.wait(5000)
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
			  console.log(c + " : Code apply successfully" +"-"+ "Discount Amount :" + rs.TotalPrice);
		  }
		  else if(!rs.valid) {
			 console.log( c + ": Invalid code"); 
		  }
		 
	  });
	}
	
	await nightmare.end()
	
	
}