# Klaviyo Forms

## How to use this repo?

```bash
npm install klaviyo-forms --save
```

```javascript
var klaviyoSubmitForm = require("klaviyo-forms")
var $klaviyoForms = $('[data-holstee-klaviyo]')
$klaviyoForms.on("submit", klaviyoSubmitForm())
$klaviyoForms.on("submitted", function(e, request, data){
  if(e) console.log(e)
  request.then(function(response){
    console.log("logging")
    console.log(response)
    console.log(data)
  });
})
```

Then you can construct your Klaviyo forms in full HTML.

```html
<form data-holstee-klaviyo>
  <input type="hidden" name="token" value="YOURTOKEN">
  <input type="hidden" name="event" value="Testing New Klaviyo Tech Solution">
  <input type="email" name="customer_properties[$email]" placeholder="email">
  <input type="hidden" name="properties[Total Price]" value="24.99">
  <input type="hidden" name="properties[Sku]" value="HOL-FAKE-SKU">
  <input type="submit">
</form>
```

## The way things are currently

Klaviyo recommends in their [API documentation](https://www.klaviyo.com/docs/getting-started) to use klaviyo like this:

```html
<script>
  var _learnq = _learnq || [];
  _learnq.push(['account', 'YOURTOKEN']);
  _learnq.push(['identify', {
    // Change the line below to dynamically print the user's email.
    '$email' : 'logged.in.user@example.com'
  }]);
  (function () {
  var b = document.createElement('script'); b.type = 'text/javascript'; b.async = true;
  b.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'a.klaviyo.com/media/js/analytics/analytics.js';
  var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(b, a);
  })();
</script>
```

This does a couple of really antiquated things.

1. It uses `script` tags...
2. It attaches the Klaviyo Analytics file to the DOM
3. It allows you to identify a use based on an email address

What it doesn't do is get that email address from the customer.

What I'm currently working with is a monstrosity that I created [here](https://gist.github.com/reggi/561d96cfdb6a076fb330) this is my existing Klaviyo file, there's a couple of really antiquated things here as well.

1. It uses AMD (Built for RequireJs, now using webpack)
4. It selects individual forms, which are the heart of any Klaviyo event and does the same repetitive selecting every time I want to create a Klaviyo form, [I wized up toward the end](https://gist.github.com/reggi/561d96cfdb6a076fb330#file-existing-klaviyo-js-L220-L243), but it's still not good enough!
