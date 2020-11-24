export default () => {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
    margin: 0;
}
.collapsible {
  background-color: #262b36;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

.content p {
    font-size: 14px;
}

</style>
</head>
<body>
<button type="button" class="collapsible">Should i register an account</button>
<div class="content">
  <p>
  No, but you need to register if you subscribe to the pro feature, to enjoy the backup feature
  </p>
</div>

<button type="button" class="collapsible">Why is only available login with google</button>
<div class="content">
  <p>
  Why do you have to log in via a password if it's easier with Google, isn't Android being prioritized by Google,
  </p>
</div>

<button type="button" class="collapsible">Why not link bookmarks with the web</button>
<div class="content">
  <p>
because we rely on this feature in the application, for application server maintenance costs
  </p>
</div>

<button type="button" class="collapsible">What's free</button>
<div class="content">
  <p>
  You can access all the features in the application, but some features are not connected to the cloud server, such as bookmarks, history, which will not be returned if you delete the application or we upgrade the application.
  </p>
</div>
<button type="button" class="collapsible">What's pro</button>
<div class="content">
  <p>You can access all the features in the application without ads, and you get access to the cloud backup feature where bookmark data, history will be stored on the server, can be restored as long as you have made a backup, cloud features can only be accessed as long as your subscription is active.
  </p>
</div>

<button type="button" class="collapsible">How to subscribe</button>
<div class="content">
  <p>you have to log in first</p>
</div>

<button type="button" class="collapsible">How much does it cost to subscribe</button>
<div class="content">
  <p>you can see the price on the subscription menu</p>
</div>


<button type="button" class="collapsible">Can i cancel the subscription</button>
<div class="content">
  <p>open the google play store application and select the manage subscriptions menu and stop subscription</p>
</div>


<button type="button" class="collapsible">Can my subscription be used on other devices</button>
<div class="content">
  <p>it is your freedom but if something suspicious happens we will terminate your account</p>
</div>


<button type="button" class="collapsible">My account was deleted / locked, can I restore it</button>
<div class="content">
  <p>please contact our support, but there is no guarantee that your account will be returned</p>
</div>

<button type="button" class="collapsible">How to contact us</button>
<div class="content">
  <p>please look at the website, never contact the contact on the playstore because we do not guarantee an answer</p>
</div>

<button type="button" class="collapsible">I subscribed to pro features but my bookmarks are missing</button>
<div class="content">
 <p>
    If you have done a backup before, your data will come back when you restore
    </p>
</div>
<script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>

</body>
</html>
`;
};
