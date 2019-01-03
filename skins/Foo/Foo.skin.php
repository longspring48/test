<?php
/**
 * Skin file for skin Foo Bar.
 *
 * @file
 * @ingroup Skins
 */

/**
 * SkinTemplate class for Foo Bar skin
 * @ingroup Skins
 */
class SkinFoo extends SkinTemplate {
	var $skinname = 'foo', $stylename = 'Foo',
		$template = 'FooTemplate', $useHeadElement = true;

	/**
	 * This function adds JavaScript via ResourceLoader
	 *
	 * Use this function if your skin has a JS file(s).
	 * Otherwise you won't need this function and you can safely delete it.
	 *
	 * @param OutputPage $out
	 */
	
	public function initPage( OutputPage $out ) {
		parent::initPage( $out );
		$out->addModules( 'skins.foo.js' );
		/* 'skins.foobar.js' is the name you used in your skin.json file */
	}

	/**
	 * Add CSS via ResourceLoader
	 *
	 * @param $out OutputPage
	 */
	function setupSkinUserCss( OutputPage $out ) {
		parent::setupSkinUserCss( $out );
		$out->addModuleStyles( array(
			'mediawiki.skinning.interface', 'skins.foo'
			/* 'skins.foo' is the name you used in your skin.json file */
		) );
	}
}

?>

<?php
/**
 * BaseTemplate class for Foo Bar skin
 *
 * @ingroup Skins
 */
class FooTemplate extends BaseTemplate {
	/**
	 * Outputs the entire contents of the page
	 */
	public function execute() {
		$this->html( 'headelement' ); ?>


<?php $this->printTrail(); ?>
</body>
</html><?php
	}
}
?>

