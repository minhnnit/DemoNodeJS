const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
	const nightmare = Nightmare({ show: false})
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
			//obj.TagDiscount = document.querySelector('.tag__text .reduction-code').textContent;
			return obj;
		  
      }).then(function(rs) {
		  if(rs.TotalPrice > 0){
			  console.log("Gia giam :" + rs.TotalPrice + " - " + c + " : Code apply successfully");
		  } else {
			  console.log("Gia giam :" + rs.TotalPrice + " - " + c + " : Invalid code");
		  }
		 
	  });
		
		//results.push(CouponApply)
		
	}
	
	//console.log('got results $s', results.join('\n'))
	
	await nightmare.end()
	
	
}