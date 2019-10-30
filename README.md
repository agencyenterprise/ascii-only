# ascii-only

ascii-only was developed because we saw that a lot of Shopify store owners were having issues with users inputting non-latin characters at the checkout stage, causing all kinds of fulfillment issues. Unfortunately, you can only use custom checkout scripts if you're using Shopify Plus, but if that describes you then you're in luck!

ascii-only is a script that prevents non-ascii characters from being used in text inputs of a Shopify checkout page. It does this by highlighting the input with an error message and blocking the submit button while the form is in an invalid state (i.e. while there are still non-ascii characters in the form fields).

![Shipping Address](https://i.imgur.com/y1lXT2x.png)

## Getting Started

The first requirement is that you **must** be a **Shopify Plus** member in order to use this script at your checkout page. Shopify only allows you to add custom scripts to checkout pages if you're a plus member, so this implementation won't work if you don't have the ability to do that. Sorry!

Ok, so if you're a plus member, let's get started!

1. Login into your Shopify admin panel and then go to **Online Store > Themes > Live theme > Actions > Edit code**.

2. You should see all your theme files displayed on the source tree. Go to the **Assets** folder

3. Either: 
  - download [ascii-only.min.js from this repository's dist folder](https://github.com/agencyenterprise/ascii-only/tree/master/dist/ascii-only.min.js) and import this into the **Assets** folder 
 - — OR —
  - click at **Add a new asset** in the **Assets** folder to create a new file named: `ascii-only.min.js`.
 - go to the ascii-only repository [dist file](https://github.com/agencyenterprise/ascii-only/tree/master/dist/ascii-only.min.js) and copy all the content there and paste it into the `ascii-only.min.js`file that you created in Shopify in step 


You have to go through these steps described above rather than just importing the script from a CDN file because Shopify will block a CDN import on the checkout page.

If you try do something like this:

```html
<script href="https://cdn.jsdelivr.net/gh/agencyenterprise/ascii-only/dist/ascii-only.min.js"></script>
```

Shopify will block the script from loaded by the browser.


4. The last step is to import the script that we've just added to the **Assets** folder. You can easily do this by adding the below code to the head (right before `</head>`) of your `Layout/checkout.liquid` file:

```liquid
<script src="{{ 'ascii-only.min.js' | asset_url }}" defer></script>
```

5. Don't forget to save these two files and you should be able to block non-ascii characters at your checkout page!

## Disclaimer

We've done our best to test this with different use cases and we'll do our best to keep this updated and working well, but we encourage you to test for yourself before implementing in your store. Feel free to open an issue if you find a bug or open a pull request to help us imporve ascii-only!

Made with ❤️ by [ae.studio](https://ae.studio/)



