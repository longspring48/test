( function ( M, $ ) {
	var TableOfContents = M.require( 'mobile.toc/TableOfContents' ),
		Toggler = M.require( 'mobile.toggle/Toggler' );

	/**
	 * Create TableOfContents if the given Page has sections and is not the main page
	 * and wgMFTocEnabled config variable is set to true.
	 * @method
	 * @param {Page} page for which a TOC is generated
	 * @ignore
	 */
	function init( page ) {
		var toc,
			sections = page.getSections(),
			$toc = $( '#toc' );

		toc = new TableOfContents( {
			sections: sections
		} );

		// eslint-disable-next-line no-new
		new Toggler( toc.$el, 'toc-', null, true );
		// if there is a toc already, replace it
		if ( $toc.length > 0 ) {
			// don't show toc at end of page, when no sections there
			$toc.replaceWith( toc.$el );
		} else {
			// otherwise append it to the lead section
			toc.appendTo( page.getLeadSectionElement() );
		}
	}

	// add a ToC only for "view" action (user is reading a page)
	if ( mw.config.get( 'wgAction' ) === 'view' ) {
		init( M.getCurrentPage() );
	}

}( mw.mobileFrontend, jQuery ) );
