# ascii-only

ascii-only is a script that prevents non-ascii characters to be used in text inputs of a Shopify checkout page. It does that by
highlighting the input with an error message and blocking the submit button while the form is in an invalid state.

## Getting Started

The first requirement is that you **must** be a **Shopify Plus** member in order to use this script at your checkout page. The
reason for that is because Shopify only allows you to add custom scripts to checkout pages if you're a plus member.

Ok, so if you're a plus member let's get started!

Login into your Shopify admin panel and then go to **Online Store > Themes > Live theme > Actions > Edit code**.

You should see all your theme files displayed on the source tree. Go to the **Assets** folder and click at **Add a new asset** to 
create a new file named: `ascii-only.min.js`. After that, go to the ascii-only repository [dist file](https://github.com/agencyenterprise/ascii-only/tree/master/dist/ascii-only.min.js)
and then copy all the content from there and paste it into your Shopify's previously created file. You can also achieve the
same result by downloading the file from this repository and importing it to the **Assets** folder.

It would be easier to just import the script from a CDN file but Shopify doesn't allow you to do it from the checkout page.
If you try do something like this:

```html
<script href="https://cdn.jsdelivr.net/gh/agencyenterprise/ascii-only/dist/ascii-only.min.js"></script>
```

Shopify will block the script of being loaded by the browser.

So the last step is to import the script that we've just added to the **Assets** folder. You can easily do it by adding this code
to the head (right before `</head>`) of your `Layout/checkout.liquid` file:

```liquid
<script src="{{ 'ascii-only.min.js' | asset_url }}" defer></script>
```

Don't forget to save these two files and you should be able to block non-ascii characters at your checkout page.

## Disclaimer

We're not responsible for any problems happening with your customers at your Shopify checkout page. This script came as a clien need and it was well tested with many user cases. You can always double-check the code (which we encourage you to do it), fork the repository to your own needs or even open a pull request to help us improve ascii-only.



