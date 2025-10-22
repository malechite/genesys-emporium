import * as images from '@emporium/images';
import React, { useMemo } from 'react';

interface DescriptionProps {
    text?: string | null;
}

export const Description = ({ text }: DescriptionProps) => {
    const checkText = useMemo(() => {
        if (text === null || text === undefined) {
            return { __html: '' };
        }

        const words = text.split(' ');
        const array = words.map(word => {
            const target = word.toLowerCase();
            switch (true) {
                case target.replace(/[,"'.?<>{}[\]]/g, '') === 'crb':
                    return `<a href="http://www.drivethrurpg.com/product/228813/Genesys-Core-Rulebook?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">CRB</a>`;
                case target.replace(/[,"'.?<>{}[\]]/g, '') === 'rot':
                    return `<a href="http://www.drivethrurpg.com/product/239561/Realms-of-Terrinoth?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">ROT</a>`;
                case target.replace(/[,"'.?<>{}[\]]/g, '') === 'sotb':
                    return `<a href="https://www.drivethrurpg.com/product/266756/Shadow-of-the-Beanstalk?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">SOTB</a>`;
                case target.includes('[blue]'):
                case target.includes('[boost]'):
                    return '<i class="ffi ffi-d6 ffi-border ffi-grpg-boost-color"></i>';
                case target.includes('[green]'):
                case target.includes('[ability]'):
                    return '<i class="ffi  ffi-d8 ffi-border ffi-grpg-ability-color"></i>';
                case target.includes('[yellow]'):
                case target.includes('[proficiency]'):
                    return '<i class="ffi ffi-d12 ffi-border ffi-grpg-proficiency-color"></i>';
                case target.includes('[black]'):
                case target.includes('[setback]'):
                    return '<i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i>';
                case target.includes('[purple]'):
                case target.includes('[difficulty]'):
                    return '<i class="ffi ffi-d8 ffi-border ffi-grpg-difficulty-color"></i>';
                case target.includes('[red]'):
                case target.includes('[challenge]'):
                    return '<i class="ffi ffi-d12 ffi-border ffi-grpg-challenge-color"></i>';
                case target.includes('[white]'):
                    return '<i class="ffi ffi-d12 ffi-border"></i>';
                case target.includes('[advantage]'):
                case target.includes('[adv]'):
                    return '<i class="ffi ffi-grpg-advantage"></i>';
                case target.includes('[success]'):
                case target.includes('[suc]'):
                    return '<i class="ffi ffi-grpg-success"></i>';
                case target.includes('[triumph]'):
                case target.includes('[tri]'):
                    return '<i class="ffi ffi-grpg-triumph"></i>';
                case target.includes('[threat]'):
                case target.includes('[thr]'):
                    return '<i class="ffi ffi-grpg-threat"></i>';
                case target.includes('[failure]'):
                case target.includes('[fail]'):
                    return '<i class="ffi ffi-grpg-failure"></i>';
                case target.includes('[despair]'):
                case target.includes('[des]'):
                    return '<i class="ffi ffi-grpg-despair"></i>';
                case target === '[rmblackblack]':
                case target === '[rmsetbacksetback]':
                    return `<b>(-</b><i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i> <i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i><b>)</b>`;
                case target.includes('[rmsetback]'):
                case target.includes('[rmblack]'):
                    return `<b>(-</b><i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i><b>)</b>`;
                case target.includes('[gm]'):
                    return `<img src=${images.gm} class="textSymbols" /> `;
                case target.includes('[pc]'):
                    return `<img src=${images.pc} class="textSymbols" /> `;
                default:
                    return `${word}`;
            }
        });
        let final = '';
        array.forEach((word, index) => {
            if (
                (word.includes('ffi') &&
                    array[index + 1] &&
                    array[index + 1].includes('ffi')) ||
                array.length === index + 1
            ) {
                final += word;
            } else {
                final += `${word} `;
            }
        });
        return { __html: final };
    }, [text]);

    return <div className="m-auto" dangerouslySetInnerHTML={checkText} />;
};
