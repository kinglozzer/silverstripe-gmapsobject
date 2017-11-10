<div class="form-group field text">
	<label class="form__field-label" for="SearchAddress">Location Search</label>
	<div class="form__field-holder">
		<input type="text" class="text" name="SearchAddress" id="SearchAddress" />
        <p class="form__field-description form-text" id="describes-SearchAddress">This field is used only to assist with marker placement, it is not shown on the front-end.<br />Please drag the marker to a specific location after typing an address or postcode</p>
	</div>
</div>
<div class="form-group field">
	<% if EnableStreetView %>
		<div id="GMapsObject_StreetView" style="width: 100%; height: 0; padding-bottom: 30%;"></div>
		<div id="GMapsObject_Map" style="width: 100%; height: 0; padding-bottom: 30%;"></div>
	<% else %>
		<div id="GMapsObject_Map" style="width: 100%; height: 0; padding-bottom: 60%;"></div>
	<% end_if %>
</div>
