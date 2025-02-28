/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { gallery as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import '../css/editor.css';
import metadata from '../../block/block.json';

/**
 * Register the block
 */
registerBlockType('stretchypants/grid-gallery', {
    ...metadata,
    icon,
    edit: ({ clientId }) => {
        const blockProps = useBlockProps();

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: [
                'core/image',
                'core/video',
                'core/embed'
            ],
            template: [
                ['core/video'],
                ['core/image'],
                ['core/image']
            ],
            templateLock: false,
            max: 6
        });

        return <div {...innerBlocksProps} />;
    },
    save: () => {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});