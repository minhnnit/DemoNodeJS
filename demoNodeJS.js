const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
	const nightmare = Nightmare({ show: true})
	const CouponArr = [ 'SPECIAL10', 'CAINAYKHONGDUOC', 'SPECIAL15', 'CAINAYKHONGDUOCNOT' ]
	const results = []
	
	for(let i = 0; i < CouponArr.length; i++){
		const c = CouponArr[i]
		
		const CouponApply = await nightmare
		.goto('https://www.smartmoderns.com')
		.click('.grid-link__title')
		.click('.grid-link__title')
		.click('#AddToCart')
		.wait(3000)
		.click('button[name="checkout"]')
		.wait(5000)
		.type('#checkout_reduction_code',c)
		.click('#order-summary > div > div.order-summary__section.order-summary__section--discount > form:nth-child(3) > div > div > div > button')
		.wait(5000)
		.evaluate(function() {
        return document.querySelector('#order-summary > div > div.order-summary__section.order-summary__section--total-lines > table > tbody > tr.total-line.total-line--reduction > td > span.order-summary__emphasis')
          .innerText;
      })
		
		results.push(CouponApply)
		
	}
	
	console.log('got results $s', results.join('\n'))
	
	await nightmare.end()
	
	
}