aeq.ui = ( function ( ui ) {
/**
 * ListBox UI class
 * @class
 * @memberof aeq
 * @param  {type} obj [description]
 */
ui.ListBox = function ( obj ) {
	this.obj = obj;
};

ui.ListBox.prototype = {
	toString: function () {
		return '[object aeq.ui.ListBox]';
	},

	extend: aeq.extend,

	/**
	 * Adds a ListItem to this ListBox
	 * @method
	 * @memberof aeq.ui.ListBox
	 * @param  {String} text  - ListItem Text
	 * @param  {Image} image  - ListItem Image
	 * @param  {Number} index - Index to insert ListItem in ListBox
	 * @return {ListItem}     - Created ListITem
	 */
	addItem: function ( text, image, index ) {
		var item = this.obj.add( 'item', text, index );

		if ( !aeq.isNullOrUndefined( image ) ) {
			item.image = image;
		}

		return item;
	},

	/**
	 * Removes a ListItem from this list
	 * @method
	 * @memberof aeq.ui.ListBox
	 * @param  {ListItem} item - ListItem to remove
	 */
	removeItem: function ( item ) {
		item = aeq.setDefault( item, this.obj.selection );

		if ( aeq.isNullOrUndefined( item ) ) {
			return;
		}

		this.obj.remove( item );
	},

	/**
	 * Removes all ListItems from this ListBox
	 * @method
	 * @memberof aeq.ui.ListBox
	 */
	removeAll: function ( ) {
		while ( this.obj.items.length > 0 ) {
			var item = this.obj.items[0];
			this.removeItem( item );
		}
	},

	/**
	 * Gets ancestor of item
	 * @method
	 * @memberof aeq.ui.ListBox
	 * @param  {ListItem} item - Item to get ancestor of
	 * @return {ListItem}      - Ancestor node
	 */
	getAncestor: function ( item ) {
		while ( item.parent.constructor.name !== 'ListBox' ) {
			item = item.parent;
		}

		return item;
	},

	/**
	 * Adds a multi-dimensional row to a list
	 * @method
	 * @memberof aeq.ui.ListBox
	 * @param  {String[]} itemArray - String array for row columns
	 * @return {ListItem}           - Created row
	 */
	addRow: function ( itemArray ) {
		var root = this.getAncestor( this.obj ).parent;

		if ( aeq.isNullOrUndefined( root.properties ) ) {
			return;
		}

		var numColumns = root.properties.numberOfColumns;
		var maxItems = itemArray.length > numColumns ? numColumns : itemArray.length;

		var item = this.addItem( itemArray[0] );

		for ( var i = 0, il = maxItems - 1; i < il; i++ ) {
			item.subItems[i].text = itemArray[i + 1];
		}

		return item;
	},

	/**
	 * Checks whether a selection in a list is contiguous
	 * @method
	 * @memberof aeq.ui.ListBox
	 * @param {ListItem[]} sel - Selection in a list
	 * @returns {Boolean}      - Whether the selection is contiguous
	 */
	contiguous: function ( sel ) {
		if ( !aeq.isArray( sel ) ) {
			return true;
		}

		var firstIndex = sel[0].index;
		var lastIndex = sel[sel.length - 1].index;

		return sel.length === ( lastIndex - firstIndex + 1 );
	},

	/**
	 * Moves selected item(s) up in a list
	 * @method
	 * @memberof aeq.ui.ListBox
	 */
	moveUp: function () {
		var items = this.obj.items;
		var selection = this.obj.selection;
		var i;

		if ( aeq.isNullOrUndefined( selection ) ) {
			return;
		}

		var first = selection.index;
		var last = first + 1;

		if ( !aeq.isNullOrUndefined( this.obj.properties ) && this.obj.properties.multiselect ) {
			selection = selection.sort( function ( a, b ) {
				return a.index - b.index;
			});

			if ( !this.contiguous( selection ) ) {
				return;
			}

			first = selection[0].index;
			last = first + selection.length;
		}

		if ( first === 0 ) {
			return;
		}

		for ( i = first; i < last; i++ ) {
			var thisItem = items[i];
			var lastItem = items[i - 1];

			this.swap( thisItem, lastItem );
		}

		this.obj.selection = null;

		for ( i = first - 1; i < last - 1; i++ ) {
			this.obj.selection = i;
		}
	},

	/**
	 * Moves selected item(s) down in a list
 	 * @method
	 * @memberof aeq.ui.ListBox
	 */
	moveDown: function () {
		var selection = this.obj.selection;
		var items = this.obj.items;
		var i;

		if ( aeq.isNullOrUndefined( selection ) ) {
			return;
		}

		var last = selection.index;
		var first = last;

		if ( !aeq.isNullOrUndefined( this.obj.properties ) && this.obj.properties.multiselect ) {
			selection = selection.sort( function ( a, b ) {
				return a.index - b.index;
			});

			if ( !this.contiguous( selection ) ) {
				return;
			}

			first = selection[0].index;
			last = selection[selection.length - 1].index;
		}

		if ( last === items.length - 1 ) {
			return;
		}

		for ( i = last; i >= first; i-- ) {
			var thisItem = items[i];
			var nextItem = items[i + 1];

			this.swap( thisItem, nextItem );
		}

		this.obj.selection = null;

		for ( i = first + 1; i <= last + 1; i++ ) {
			this.obj.selection = i;
		}
	},

	/**
	 * Moves selected item(s) to the top of a list
 	 * @method
	 * @memberof aeq.ui.ListBox
	 */
	moveToTop: function () {
		var selection = this.obj.selection;
		var items = this.obj.items;
		var i;
		var il;

		if ( aeq.isNullOrUndefined( selection ) ) {
			return;
		}

		var first = selection.index;
		var last = first + 1;

		if ( !aeq.isNullOrUndefined( this.obj.properties ) && this.obj.properties.multiselect ) {
			selection = selection.sort( function ( a, b ) {
				return a.index - b.index;
			});

			if ( !this.contiguous( selection ) ) {
				return;
			}

			first = selection[0].index;
			last = first + selection.length;
		}

		if ( first === 0 ) {
			return;
		}

		for ( var j = 0, jl = first; j < jl; j++ ) {
			for ( i = first; i < last; i++ ) {
				var thisItem = items[i - j];
				var lastItem = items[i - j - 1];

				this.swap( thisItem, lastItem );
			}
		}

		this.obj.selection = null;

		for ( i = 0, il = last - first; i < il; i++ ) {
			this.obj.selection = i;
		}
	},

	/**
	 * Moves selected item(s) to the bottom of a list
 	 * @method
	 * @memberof aeq.ui.ListBox
	 */
	moveToBottom: function () {
		var selection = this.obj.selection;
		var items = this.obj.items;
		var i;
		var il;

		if ( aeq.isNullOrUndefined( selection ) ) {
			return;
		}

		var last = selection.index;
		var first = last;

		if ( !aeq.isNullOrUndefined( this.obj.properties ) && this.obj.properties.multiselect ) {
			selection = selection.sort( function ( a, b ) {
				return a.index - b.index;
			});

			if ( !this.contiguous( selection ) ) {
				return;
			}

			first = selection[0].index;
			last = selection[selection.length - 1].index;
		}

		if ( last === items.length - 1 ) {
			return;
		}

		var spanLength = items.length - last - 1;

		for ( var j = 0, jl = spanLength; j < jl; j++ ) {
			for ( i = last; i >= first; i-- ) {
				var thisItem = items[i + j];
				var nextItem = items[i + j + 1];

				this.swap( thisItem, nextItem );
			}
		}

		this.obj.selection = null;

		for ( i = spanLength + first, il = items.length; i < il; i++ ) {
			this.obj.selection = i;
		}
	},

	/**
	 * Swaps two listItems
 	 * @method
	 * @memberof aeq.ui.ListBox
	 * @param {ListItem} a Item to swap from
	 * @param {ListItem} b Item to swap to
	 */
	swap: function ( a, b ) {
		var temp = a.text;
		a.text = b.text;
		b.text = temp;
	},

	/**
	 * Gets the selection in a list
 	 * @method
	 * @memberof aeq.ui.ListBox
 	 * @returns {ListItem[]} Array of selected items
	 */
	getSelection: function () {
		var selection = this.obj.selection;

		if ( aeq.isNullOrUndefined( selection ) ) {
			return aeq.arrayEx();
		}

		return aeq.arrayEx( selection );
	}

};

// Aliases, backwards compatible
ui.ListBox.prototype.add = ui.ListBox.prototype.addItem;

return ui;
}( aeq.ui || {}) );
