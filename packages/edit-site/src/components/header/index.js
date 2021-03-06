/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import { BlockNavigationDropdown, ToolSelector } from '@wordpress/block-editor';
import { PinnedItems } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import { useEditorContext } from '../editor';
import FullscreenModeClose from './fullscreen-mode-close';
import TemplateSwitcher from '../template-switcher';
import SaveButton from '../save-button';

export default function Header() {
	const { settings, setSettings } = useEditorContext();
	const setActiveTemplateId = useCallback(
		( newTemplateId ) =>
			setSettings( ( prevSettings ) => ( {
				...prevSettings,
				templateId: newTemplateId,
				templateType: 'wp_template',
			} ) ),
		[]
	);
	const setActiveTemplatePartId = useCallback(
		( newTemplatePartId ) =>
			setSettings( ( prevSettings ) => ( {
				...prevSettings,
				templateId: newTemplatePartId,
				templateType: 'wp_template_part',
			} ) ),
		[]
	);
	const addTemplateId = useCallback(
		( newTemplateId ) =>
			setSettings( ( prevSettings ) => ( {
				...prevSettings,
				templateId: newTemplateId,
				templateIds: [ ...prevSettings.templateIds, newTemplateId ],
			} ) ),
		[]
	);
	return (
		<div className="edit-site-header">
			<FullscreenModeClose />
			<div className="edit-site-header__toolbar">
				<TemplateSwitcher
					ids={ settings.templateIds }
					templatePartIds={ settings.templatePartIds }
					activeId={ settings.templateId }
					isTemplatePart={
						settings.templateType === 'wp_template_part'
					}
					onActiveIdChange={ setActiveTemplateId }
					onActiveTemplatePartIdChange={ setActiveTemplatePartId }
					onAddTemplateId={ addTemplateId }
				/>
				<BlockNavigationDropdown />
				<ToolSelector />
			</div>
			<div className="edit-site-header__actions">
				<SaveButton />
				<PinnedItems.Slot scope="core/edit-site" />
			</div>
		</div>
	);
}
