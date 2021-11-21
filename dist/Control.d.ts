import { default as React } from 'react';
import type { PropEx } from '@cssfn/css-types';
import { StyleCollection } from '@cssfn/cssfn';
import { ThemeName } from '@nodestrap/basic';
import { IndicatorProps } from '@nodestrap/indicator';
export declare const markActive: () => StyleCollection;
export declare const usesThemeDefault: (themeName?: ThemeName | null) => StyleCollection;
export declare const usesThemeActive: (themeName?: ThemeName | null) => StyleCollection;
export interface FocusBlurVars {
    boxShadow: any;
    anim: any;
    /**
     * functional boxShadow color - at focus state.
     */
    boxShadowFn: any;
    /**
     * final boxShadow color - at focus state.
     */
    boxShadowCol: any;
    /**
     * final boxShadow single layer - at focus state.
     */
    boxShadowLy: any;
}
export declare const isFocused: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isFocusing: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isBlurring: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isBlurred: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isFocus: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isBlur: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isFocusBlurring: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
/**
 * Uses focus & blur states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents focus & blur state definitions.
 */
export declare const usesFocusBlurState: () => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<FocusBlurVars>, import("@cssfn/css-var").ReadonlyDecls<FocusBlurVars>];
export declare const useFocusBlurState: <TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>) => {
    focus: boolean;
    class: string | null;
    handleFocus: () => void;
    handleBlur: () => void;
    handleAnimationEnd: (e: React.AnimationEvent<HTMLElement>) => void;
};
export interface ArriveLeaveVars {
    filter: any;
    anim: any;
}
export declare const isArrived: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isArriving: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isLeaving: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isLeft: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isArrive: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isLeave: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
export declare const isArriveLeaving: (styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
/**
 * Uses arrive (hover) & leave states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents arrive (hover) & leave state definitions.
 */
export declare const usesArriveLeaveState: () => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<ArriveLeaveVars>, import("@cssfn/css-var").ReadonlyDecls<ArriveLeaveVars>];
export declare const useArriveLeaveState: <TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>, focusBlurState: {
    focus: boolean;
}) => {
    arrive: boolean;
    class: string | null;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleAnimationEnd: (e: React.AnimationEvent<HTMLElement>) => void;
};
export declare const usesControlLayout: () => StyleCollection;
export declare const usesControlVariants: () => StyleCollection;
export declare const usesControlStates: () => StyleCollection;
export declare const useControlSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    cursorDisable: string;
    boxShadowFocus: (string | number)[][];
    filterArrive: string[][];
    '@keyframes focus': PropEx.Keyframes;
    '@keyframes blur': PropEx.Keyframes;
    '@keyframes arrive': PropEx.Keyframes;
    '@keyframes leave': PropEx.Keyframes;
    animFocus: (string | PropEx.Keyframes)[][];
    animBlur: (string | PropEx.Keyframes)[][];
    animArrive: (string | PropEx.Keyframes)[][];
    animLeave: (string | PropEx.Keyframes)[][];
}>, cssDecls: import("@cssfn/css-config").Decls<{
    cursorDisable: string;
    boxShadowFocus: (string | number)[][];
    filterArrive: string[][];
    '@keyframes focus': PropEx.Keyframes;
    '@keyframes blur': PropEx.Keyframes;
    '@keyframes arrive': PropEx.Keyframes;
    '@keyframes leave': PropEx.Keyframes;
    animFocus: (string | PropEx.Keyframes)[][];
    animBlur: (string | PropEx.Keyframes)[][];
    animArrive: (string | PropEx.Keyframes)[][];
    animLeave: (string | PropEx.Keyframes)[][];
}>, cssVals: import("@cssfn/css-config").Vals<{
    cursorDisable: string;
    boxShadowFocus: (string | number)[][];
    filterArrive: string[][];
    '@keyframes focus': PropEx.Keyframes;
    '@keyframes blur': PropEx.Keyframes;
    '@keyframes arrive': PropEx.Keyframes;
    '@keyframes leave': PropEx.Keyframes;
    animFocus: (string | PropEx.Keyframes)[][];
    animBlur: (string | PropEx.Keyframes)[][];
    animArrive: (string | PropEx.Keyframes)[][];
    animLeave: (string | PropEx.Keyframes)[][];
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface ControlProps<TElement extends HTMLElement = HTMLElement> extends IndicatorProps<TElement> {
    focus?: boolean;
    tabIndex?: number;
    arrive?: boolean;
}
export declare function Control<TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>): JSX.Element;
export { Control as default };
