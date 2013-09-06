<div class="field text">
	<label class="left" for="SearchAddress">Location Search</label>
	<div class="middleColumn">
		<input type="text" class="text" name="SearchAddress" id="SearchAddress" />
	</div>
	<span class="description">This field is used only to assist with marker placement, it is not shown on the front-end.<br />Please drag the marker to a specific location after typing an address or postcode</span>
</div>
<div class="field">
	<% if EnableStreetView %>
		<div id="GMapsObject_StreetView" style="width: 100%; height: 240px;"></div>
		<div id="GMapsObject_Map" style="width: 100%; height: 240px;"></div>
	<% else %>
		<div id="GMapsObject_Map" style="width: 100%; height: 480px;"></div>
	<% end_if %>
</div>