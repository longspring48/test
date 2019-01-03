<?php
/**
 * This file is part of the MediaWiki skin Chameleon.
 *
 * @copyright 2013 - 2014, Stephan Gambke
 * @license   GNU General Public License, version 3 (or any later version)
 *
 * The Chameleon skin is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * The Chameleon skin is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @file
 * @ingroup Skins
 */

namespace Skins\Chameleon\Tests\Integration;

use Bootstrap\BootstrapManager;
use Bootstrap\ResourceLoaderBootstrapModule;
use CSSMin;
use HashBagOStuff;
use Skins\Chameleon\Hooks\SetupAfterCache;

/**
 * @coversNothing
 *
 * @group skins-chameleon
 * @group skins-chameleon-integration
 * @group mediawiki-databaseless
 *
 * @author Stephan Gambke
 * @since 1.1
 * @ingroup Skins
 * @ingroup Test
 */
class StylesCompileTest extends \PHPUnit_Framework_TestCase {

	public function testStylesCompile() {

		$request = $this->getMockBuilder('\WebRequest')
			->disableOriginalConstructor()
			->getMock();

		$setupAfterCache = new SetupAfterCache(
			BootstrapManager::getInstance(),
			$GLOBALS,
			$request
		);

		$setupAfterCache->process();

		$resourceLoaderContext = $this->getMockBuilder( '\ResourceLoaderContext' )
			->disableOriginalConstructor()
			->getMock();

		$module = new ResourceLoaderBootstrapModule( $GLOBALS[ 'wgResourceModules' ][ 'ext.bootstrap.styles' ] );
		$module->setCache( new HashBagOStuff() );

		$styles = $module->getStyles( $resourceLoaderContext );
		$css = CSSMin::minify( $styles[ 'all' ] );

		$this->assertNotEquals( '', $css );

	}

}
