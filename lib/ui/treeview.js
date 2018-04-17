aeq.ui = ( function ( ui ) {
/**
 * TreeView UI class
 * @class
 * @memberof aeq
 * @param  {type} obj [description]
 * @return {type}     [description]
 */
ui.TreeView = function ( obj ) {
	this.obj = obj;
};

ui.TreeView.prototype = ui.ListBox.prototype;

ui.TreeView.prototype.toString = function () {
	return '[object aeq.ui.TreeView]';
};

/**
 * Reveals (expands) an item in a treeview by name
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {String} name - Name of the node to reveal
 */
ui.TreeView.prototype.revealItem = function ( name ) {
	var tree = this.obj;
	var items = this.findItemByName( tree, [], name );

	if ( tree.items.length === 0 || items.length === 0 ) {
		tree.selection = null;
		return;
	}

	var item = items[0];
	var temp = item;

	while ( item.parent.constructor.name !== 'TreeView' ) {
		item.parent.expanded = true;
		item = item.parent;
	}

	tree.selection = temp;
	tree.active = true;
};

/**
 * Adds a node to a UITreeView
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {String} text        - Text to add to the node
 * @param {Image} [image]      - Image to set as icon for the node
 * @param {Number} [index]     - Index to add the node at
 * @param {Boolean} [expanded] - Whether the node is expanded
 * @returns {aeq.ui.TreeView}  - Node as TreeView item
 */
ui.TreeView.prototype.addNode = function ( text, image, index, expanded ) {
	expanded = aeq.setDefault( expanded, true );

	var node = this.obj.add( 'node', text, index );

	if ( !aeq.isNullOrUndefined( image ) ) {
		node.image = image;
	}

	node.expanded = expanded;

	return new ui.TreeView( node );
};

/**
 * Gets ancestor of item
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} item - Node to get ancestor of
 * @returns {_Node}    - Ancestor item
 */
ui.TreeView.prototype.getAncestor = function ( item ) {
	while ( item.parent.constructor.name !== 'TreeView' ) {
		item = item.parent;
	}

	return item;
};

/**
 * Removes ancestor of node
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {ListItem} item - Node to remove ancestor of
 */
ui.TreeView.prototype.removeAncestor = function ( item ) {
	var ancestor = this.getAncestor( item );
	this.removeItem( ancestor );
};

/**
 * Expands a node and all children
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} node - Root node to expand children of
 */
ui.TreeView.prototype.expandNodes = function ( node ) {
	node.expanded = true;

	for ( var i = 0, il = node.items.length; i < il; i++ ) {
		var branch = node.items[i];
		if ( this.isNode( branch ) ) {
			this.expandNodes( branch );
		}
	}
};

/**
 * Collapses a node and all children
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} node - Root node to collapse children of
 */
ui.TreeView.prototype.collapseNodes = function ( node ) {
	node.expanded = false;

	var branches = node.items;

	for ( var i = 0, il = branches.length; i < il; i++ ) {
		var branch = branches[i];
		if ( this.isNode( branch ) ) {
			this.collapseNodes( branch );
		}
	}
};


/**
 * Finds items by name in a node
 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} node   - Container node
 * @param {_Node[]} list - Array of found items
 * @param {String} name  - Name to search in
 * @returns {_Node[]}    - Array of found items
 */
ui.TreeView.prototype.findItemByName = function ( node, list, name ) {
	var branches = node.items;

	for ( var i = 0, il = branches.length; i < il; i++ ) {
		var branch = branches[i];
		if ( branch.text !== name ) {
			continue;
		}

		if ( this.isNode( branch ) ) {
			this.findItemByName( branch, list, name );
		}

		list.push( branch );
	};

	return list;
};

/**
 * Creates a new node or branch based on an existing one
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} node Node to copy
 * @param {_Node} nodeCopy New node or branch
 */
ui.TreeView.prototype.copyBranch = function ( node, nodeCopy ) {
	var newNode = nodeCopy.add( node.type, node.text );
	var me = this;

	if ( !this.isNode( node ) ) {
		return;
	}

	var branches = node.items;

	aeq.forEach( branches, function ( branch ) {
		if ( me.isNode( branch ) ) {
			me.copyBranch( branch, newNode );
		} else {
			newNode.add( 'item', node.text );
		}
	});
};

/**
 * Checks whether an branch is a node
 *
 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} branch Branch to check
 * @returns {Boolean} Whether branch is node
 */
ui.TreeView.prototype.isNode = function ( branch ) {
	if ( aeq.isNullOrUndefined( branch ) ) {
		return false;
	}

	return branch.type === 'node';
};

/**
 * Checks whether a branch is an item

 * @method
 * @memberof aeq.ui.TreeView
 * @param {_Node} branch Branch to check
 * @returns {Boolean} Whether branch is item
 */
ui.TreeView.prototype.isItem = function ( branch ) {
	if ( aeq.isNullOrUndefined( branch ) ) {
		return false;
	}

	return branch.type === 'item';
};

/**
 * Moves selected item(s) up in a treeview
 *
 * @method
 * @memberof aeq.ui.TreeView
 */
ui.TreeView.prototype.moveUp = function () {
	var tree = this.obj;

	if ( tree.selection === null ) return;

	if ( tree.selection.index > 0 ) {
		var sel = tree.selection;
		var prev = sel.parent.items[sel.index - 1];

		if ( this.isItem( sel ) && this.isItem( prev ) ) {
			this.swap( sel, prev );
			tree.selection = prev;
			return;
		}

		if ( this.isNode( sel ) && this.isItem( prev ) ) {
			sel.parent.add( 'item', prev.text, sel.index + 1 );
			this.removeItem( sel );
			return;
		}

		if ( this.isItem( sel ) && this.isNode( prev ) ) {
			tree.selection = sel.parent.add( 'item', sel.text, sel.index - 1 );
			this.removeItem( sel );
			return;
		}

		var target = sel.parent.add( 'node', sel.text, sel.index - 1 );

		for ( var i = 0, il = target.length; i < il; i++ ) {
			this.copyBranch( sel.items[i], target );
		}

		tree.selection = target;
		this.removeItem( sel );
	}
};

/**
 * Moves selected item(s) down in a treeview
 *
 * @method
 * @memberof aeq.ui.TreeView
 */
ui.TreeView.prototype.moveDown = function () {
	var tree = this.obj;

	if ( tree.selection === null ) return;

	if ( tree.selection.index < tree.items.length - 1 ) {
		var sel = tree.selection;
		var next = sel.parent.items[sel.index + 1];

		if ( this.isItem( sel ) && this.isItem( next ) ) {
			this.swap( sel, next );
			tree.selection = next;
			return;
		}

		if ( this.isNode( sel ) && this.isItem( next ) ) {
			sel.parent.add( 'item', next.text, sel.index - 1 );
			this.removeItem( next );
			return;
		}

		if ( this.isItem( sel ) && this.isNode( next ) ) {
			tree.selection = sel.parent.add( 'item', sel.text, sel.index + 1 );
			this.removeItem( sel );
			return;
		}

		var target = sel.parent.add( 'node', sel.text, sel.index + 2 );

		for ( var i = 0, il = target.length; i < il; i++ ) {
			this.copyBranch( sel.items[i], target );
		};

		tree.selection = target;
		this.removeItem( sel );
	}
};

return ui;
}( aeq.ui || {}) );
