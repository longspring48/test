( function ( M, $ ) {
	var browser = M.require( 'mobile.startup/Browser' ).getSingleton(),
		View = M.require( 'mobile.startup/View' );

	/**
	 * Representation of the main menu
	 *
	 * @class MainMenu
	 * @extends View
	 * @constructor
	 * @param {Object} options Configuration options
	 * @module skins.minerva.mainMenu/MainMenu
	 */
	function MainMenu( options ) {
		this.activator = options.activator;
		View.call( this, options );
	}

	OO.mfExtend( MainMenu, View, {
		isTemplateMode: true,
		template: mw.template.get( 'skins.minerva.mainMenu', 'menu.hogan' ),
		templatePartials: {
			menuGroup: mw.template.get( 'skins.minerva.mainMenu', 'menuGroup.hogan' )
		},

		/**
		 * @cfg {Object} defaults Default options hash.
		 * @cfg {string} defaults.activator selector for element that when clicked can open or close the menu
		 */
		defaults: {
			activator: undefined
		},

		/**
		 * Turn on event logging on the existing main menu by reading `event-name` data
		 * attributes on elements.
		 */
		enableLogging: function () {
			// Load the EventLogging module inside MobileFrontend if available
			mw.loader.using( 'mobile.loggingSchemas.mobileWebMainMenuClickTracking' );
			this.$( 'a' ).on( 'click', function () {
				var $link = $( this ),
					eventName = $link.data( 'event-name' );
				if ( eventName ) {
					mw.track( 'mf.schemaMobileWebMainMenuClickTracking', {
						name: eventName,
						destination: $link.attr( 'href' )
					} );
				}
			} );
		},
		/**
		 * Remove the nearby menu entry if the browser doesn't support geo location
		 */
		postRender: function () {
			if ( !browser.supportsGeoLocation() ) {
				this.$el.find( '.nearby' ).parent().remove();
			}

			this.registerClickEvents();
		},

		/**
		 * Registers events for opening and closing the main menu
		 */
		registerClickEvents: function () {
			var self = this;

			// Listen to the main menu button clicks
			$( this.activator )
				.off( 'click' )
				.on( 'click', function ( ev ) {
					if ( self.isOpen() ) {
						self.closeNavigationDrawers();
					} else {
						self.openNavigationDrawer();
					}
					ev.preventDefault();
					// Stop propagation, otherwise the Skin will close the open menus on page center click
					ev.stopPropagation();
				} );
		},

		/**
		 * Check whether the navigation drawer is open
		 * @return {boolean}
		 */
		isOpen: function () {
			// FIXME: We should be moving away from applying classes to the body
			return $( 'body' ).hasClass( 'navigation-enabled' );
		},

		/**
		 * Close all open navigation drawers
		 */
		closeNavigationDrawers: function () {
			// FIXME: We should be moving away from applying classes to the body
			$( 'body' ).removeClass( 'navigation-enabled' )
				.removeClass( 'secondary-navigation-enabled' )
				.removeClass( 'primary-navigation-enabled' );
		},

		/**
		 * Toggle open navigation drawer
		 * @param {string} [drawerType] A name that identifies the navigation drawer that
		 *     should be toggled open. Defaults to 'primary'.
		 * @fires MainMenu#open
		 */
		openNavigationDrawer: function ( drawerType ) {
			// close any existing ones first.
			this.closeNavigationDrawers();
			drawerType = drawerType || 'primary';
			// FIXME: We should be moving away from applying classes to the body
			$( 'body' ).toggleClass( 'navigation-enabled' )
				.toggleClass( drawerType + '-navigation-enabled' );

			this.emit( 'open' );
		}
	} );

	M.define( 'skins.minerva.mainMenu/MainMenu', MainMenu );

}( mw.mobileFrontend, jQuery ) );
