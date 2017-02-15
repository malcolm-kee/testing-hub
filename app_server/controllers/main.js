/* Get home page */
module.exports.index = function(req, res) {
	res.render('index', 
		{
			title: 'Welcome to DSO!',
			upcoming_items: [
				{
					name: 'Links stored and retrieved from DB'
				},
				{
					name: 'Authentication for access with login'
				}
			],
			call_to_action: {
				description: 'Why don\'t you tell me your thought?',
				name: 'Email Me',
				link: 'mailto:malcolm.keeweesiong@gmail.com'
			},
			popular_offerings: [
				{
					name: 'Device Bundle',
					details: 'Postpaid IPHONE_7 Bundle',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/mini-cart.ep?pID=IPHONE_7_DGPP#buy'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/mini-cart.ep?pID=IPHONE_7_DGPP#buy'
						}
					]
				},
				{
					name: 'Device Bundle',
					details: 'Samsung Galaxy J7 Bundle',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/mini-cart.ep?pID=SAMSUNG_GALAXY_J7_PRIME_DGPP#buy'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/mini-cart.ep?pID=SAMSUNG_GALAXY_J7_PRIME_DGPP#buy'
						}
					]
				},
				{
					name: 'Postpaid Plan',
					details: 'Postpaid 110 Plan New Line, COP, CR',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=10202VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.82725398.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=10202VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.82725398.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Prepaid Plan',
					details: 'Prepaid Best 2016 Plan',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20015&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.127936268.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20015&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.127936268.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Prepaid Broadband',
					details: 'Prepaid Home Broadband Plan',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20017&isBundle=n&ppymttype=PREPAID&ptype=BB&_ga=1.127936268.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20017&isBundle=n&ppymttype=PREPAID&ptype=BB&_ga=1.127936268.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Prepaid MNP',
					details: 'Digi Prepaid Best MNP',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20018&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.164576191.1630836739.1476439133'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20018&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.164576191.1630836739.1476439133'
						}
					]
				}
			],
			preprod_offerings: [
				{
					name: 'IPhone 7 Bundle',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/mini-cart.ep?pID=IPHONE_7_DGPP#buy'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/mini-cart.ep?pID=IPHONE_7_DGPP#buy'
						}
					]
				},
				{
					name: 'IPhone 7 Plus Bundle',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/mini-cart.ep?pID=IPHONE_7PLUS_DGPP#buy'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/mini-cart.ep?pID=IPHONE_7PLUS_DGPP#buy'
						}
					]
				},
				{
					name: 'Samsung Galaxy J7 Bundle',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/mini-cart.ep?pID=SAMSUNG_GALAXY_J7_PRIME_DGPP#buy'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/mini-cart.ep?pID=SAMSUNG_GALAXY_J7_PRIME_DGPP#buy'
						}
					]
				},
				{
					name: 'Postpaid 50',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=10201VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.64925487.1200425632.1479720347Postpaid'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=10201VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.64925487.1200425632.1479720347Postpaid'
						}
					]
				},
				{
					name: 'Postpaid 80',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=10200VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.82725398.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=10200VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.82725398.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Postpaid 110',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=10202VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.82725398.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=10202VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.82725398.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Prepaid Best 2016 Plan',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20015&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.127936268.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20015&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.127936268.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Prepaid Home Broadband Plan',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20017&isBundle=n&ppymttype=PREPAID&ptype=BB&_ga=1.127936268.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20017&isBundle=n&ppymttype=PREPAID&ptype=BB&_ga=1.127936268.1200425632.1479720347'
						}
					]
				},
				{
					name: 'Digi Prepaid Best MNP',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20018&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.164576191.1630836739.1476439133'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20018&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.164576191.1630836739.1476439133'
						}
					]
				},
				{
					name: 'IPhone 7 Rosegold Staff',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/my-device.ep?pID=IPHONE_7PLUS_STA&selDeviceSku=IPHONE_7PLUS_STA_ROSEGOLD_32GB&oqty=1&clearCart=Y&_ga=1.56518187.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/my-device.ep?pID=IPHONE_7PLUS_STA&selDeviceSku=IPHONE_7PLUS_STA_ROSEGOLD_32GB&oqty=1&clearCart=Y&_ga=1.56518187.1200425632.1479720347'
						}
					]
				},
				{
					name: 'IPhone 7 Black Staff',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/my-device.ep?pID=IPHONE_7_STA&selDeviceSku=IPHONE_7_STA_BLACK_128GB&oqty=1&clearCart=Y&_ga=1.56518187.1200425632.1479720347'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/my-device.ep?pID=IPHONE_7_STA&selDeviceSku=IPHONE_7_STA_BLACK_128GB&oqty=1&clearCart=Y&_ga=1.56518187.1200425632.1479720347'
						}
					]
				}
			],
			staging_offerings: [
				{
					name: 'Postpaid Plan Bundle',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=GALAXY_S5&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&selDeviceSku=GALAXY_S5_CHARBLACK_16GB&selPlanSku=DGSP148A_24MONTH&storeCode'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=GALAXY_S5&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&selDeviceSku=GALAXY_S5_CHARBLACK_16GB&selPlanSku=DGSP148A_24MONTH&storeCode'
						}
					]
				},
				{
					name: 'Postpaid Negative Case',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=IPHONE_6PLUS&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&selDeviceSku=IPHONE_6PLUS_GOLD_16GB&selPlanSku=10226_24MONTH'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=IPHONE_6PLUS&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&selDeviceSku=IPHONE_6PLUS_GOLD_16GB&selPlanSku=10226_24MONTH'
						}
					]
				},
				{
					name: 'Postpaid PPA 148 Plan',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=10170VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.147976480.false#/'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=10170VPA&isBundle=y&ppymttype=POSTPAID&ptype=VOICE&_ga=1.147976480.false#/'
						}
					]
				},
				{
					name: 'Prepaid Plan',
					links: [
						{
							env: 'QA',
							url: 'https://storeqa.digi.com.my/storefront/product-config.ep?pID=20003&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.164576191.1630836739.1476439133'
						},
						{
							env: 'UAT',
							url: 'https://storeuat.digi.com.my/storefront/product-config.ep?pID=20003&isBundle=n&ppymttype=PREPAID&ptype=VOICE&_ga=1.164576191.1630836739.1476439133'
						}
					]
				}
			]
		}
	);
};