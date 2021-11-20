// react:
import { default as React, useState, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, vars, 
// rules:
states, rule, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, fallbacks, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { colors, } from '@nodestrap/colors'; // configurable colors & theming defs
import { stripoutControl, } from '@nodestrap/stripouts';
import { 
// hooks:
usePropEnabled, } from '@nodestrap/accessibilities';
// nodestrap components:
import { 
// hooks:
usesSizeVariant, usesThemeVariant, usesThemeDefault as basicUsesThemeDefault, usesAnim, fallbackNoneBoxShadow, fallbackNoneFilter, } from '@nodestrap/basic';
import { 
// hooks:
isDisable, isActive, markActive as indicatorMarkActive, usesThemeActive as indicatorUsesThemeActive, 
// styles:
usesIndicatorLayout, usesIndicatorVariants, usesIndicatorStates, Indicator, } from '@nodestrap/indicator';
// hooks:
// states:
//#region activePassive
export const markActive = () => composition([
    imports([
        indicatorMarkActive(),
        usesThemeActive(), // switch to active theme
    ]),
]);
// change default parameter from `null` to 'secondary':
export const usesThemeDefault = (themeName = 'secondary') => basicUsesThemeDefault(themeName);
// change default parameter from 'secondary' to 'primary':
export const usesThemeActive = (themeName = 'primary') => indicatorUsesThemeActive(themeName);
const [focusBlurRefs, focusBlurDecls] = createCssVar();
{
    const [, , , propsManager] = usesAnim();
    propsManager.registerBoxShadow(focusBlurRefs.boxShadow);
    propsManager.registerAnim(focusBlurRefs.anim);
}
// .focused will be added after focusing-animation done:
const selectorIsFocused = '.focused';
// .focus = programatically focus, :focus = user focus:
const selectorIsFocusing = ['.focus',
    ':focus:not(.disabled):not(.disable):not(:disabled):not(.focused):not(.blur):not(.blurred)'];
// .blur will be added after loosing focus and will be removed after blurring-animation done:
const selectorIsBlurring = '.blur';
// if all above are not set => blurred
// optionally use .blurred to kill pseudo :focus:
const selectorIsBlurred = [':not(.focused):not(.focus):not(:focus):not(.blur)',
    ':not(.focused):not(.focus).disabled:not(.blur)',
    ':not(.focused):not(.focus).disable:not(.blur)',
    ':not(.focused):not(.focus):disabled:not(.blur)',
    '.blurred'];
export const isFocused = (styles) => rule(selectorIsFocused, styles);
export const isFocusing = (styles) => rule(selectorIsFocusing, styles);
export const isBlurring = (styles) => rule(selectorIsBlurring, styles);
export const isBlurred = (styles) => rule(selectorIsBlurred, styles);
export const isFocus = (styles) => rule([selectorIsFocusing, selectorIsFocused], styles);
export const isBlur = (styles) => rule([selectorIsBlurring, selectorIsBlurred], styles);
export const isFocusBlurring = (styles) => rule([selectorIsFocusing, selectorIsFocused, selectorIsBlurring], styles);
/**
 * Uses focus & blur states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents focus & blur state definitions.
 */
export const usesFocusBlurState = () => {
    // dependencies:
    const [, themeRefs] = usesThemeVariant();
    return [
        () => composition([
            vars({
                [focusBlurDecls.boxShadowFn]: fallbacks(themeRefs.focusImpt, // first  priority
                themeRefs.focus, // second priority
                themeRefs.focusCond, // third  priority
                colors.secondaryThin),
                [focusBlurDecls.boxShadowCol]: fallbacks(
                // no toggle outlined nor toggle mild yet (might be added in the future)
                focusBlurRefs.boxShadowFn),
                [focusBlurDecls.boxShadowLy]: [[
                        // combining: pos width spread color ...
                        // boxShadowFocus pos, width, spread, etc:
                        cssProps.boxShadowFocus,
                        // boxShadowFocus color:
                        focusBlurRefs.boxShadowCol,
                    ]],
            }),
            states([
                isFocused([
                    vars({
                        [focusBlurDecls.boxShadow]: focusBlurRefs.boxShadowLy,
                    }),
                ]),
                isFocusing([
                    vars({
                        [focusBlurDecls.boxShadow]: focusBlurRefs.boxShadowLy,
                        [focusBlurDecls.anim]: cssProps.animFocus,
                    }),
                ]),
                isBlurring([
                    vars({
                        [focusBlurDecls.boxShadow]: focusBlurRefs.boxShadowLy,
                        [focusBlurDecls.anim]: cssProps.animBlur,
                    }),
                ]),
            ]),
        ]),
        focusBlurRefs,
        focusBlurDecls,
    ];
};
export const useFocusBlurState = (props) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    // states:
    const [focused, setFocused] = useState(props.focus ?? false); // true => focus, false => blur
    const [animating, setAnimating] = useState(null); // null => no-animation, true => focusing-animation, false => blurring-animation
    const [focusDn, setFocusDn] = useState(false); // uncontrollable (dynamic) state: true => user focus, false => user blur
    /*
     * state is always blur if disabled
     * state is focus/blur based on [controllable focus] (if set) and fallback to [uncontrollable focus]
     */
    const focusFn = propEnabled && (props.focus /*controllable*/ ?? focusDn /*uncontrollable*/);
    if (focused !== focusFn) { // change detected => apply the change & start animating
        setFocused(focusFn); // remember the last change
        setAnimating(focusFn); // start focusing-animation/blurring-animation
    }
    const handleFocus = () => {
        if (!propEnabled)
            return; // control is disabled => no response required
        if (props.focus !== undefined)
            return; // controllable [focus] is set => no uncontrollable required
        setFocusDn(true);
    };
    const handleBlur = () => {
        if (!propEnabled)
            return; // control is disabled => no response required
        if (props.focus !== undefined)
            return; // controllable [focus] is set => no uncontrollable required
        setFocusDn(false);
    };
    const handleIdle = () => {
        // clean up finished animation
        setAnimating(null); // stop focusing-animation/blurring-animation
    };
    return {
        focus: focused,
        class: (() => {
            // focusing:
            if (animating === true) {
                // focusing by controllable prop => use class .focus
                if (props.focus !== undefined)
                    return 'focus';
                // negative [tabIndex] => can't be focused by user input => treats Control as *wrapper* element => use class .focus
                if ((props.tabIndex ?? 0) < 0)
                    return 'focus';
                // use class .focus instead of pseudo :focus
                // in case of child got focus, the parent is also marked as focus
                return 'focus';
                // otherwise use pseudo :focus
                // return null;
            } // if
            // blurring:
            if (animating === false)
                return 'blur';
            // fully focused:
            if (focused)
                return 'focused';
            // fully blurred:
            if (props.focus !== undefined) {
                return 'blurred'; // blurring by controllable prop => use class .blurred to kill pseudo :focus
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        handleFocus: handleFocus,
        handleBlur: handleBlur,
        handleAnimationEnd: (e) => {
            if (e.target !== e.currentTarget)
                return; // no bubbling
            if (/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
const [arriveLeaveRefs, arriveLeaveDecls] = createCssVar();
{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(arriveLeaveRefs.filter);
    propsManager.registerAnim(arriveLeaveRefs.anim);
}
// .arrived will be added after arriving-animation done:
const selectorIsArrived = '.arrived';
// arrive = a combination of .arrive || :hover || (.focused || .focus || :focus)
// .arrive = programatically arrive, :hover = user hover:
const selectorIsArriving = ['.arrive',
    ':hover:not(.disabled):not(.disable):not(:disabled):not(.arrived):not(.leave):not(.left)',
    '.focused:not(.arrived):not(.leave):not(.left)',
    '.focus:not(.arrived):not(.leave):not(.left)',
    ':focus:not(.disabled):not(.disable):not(:disabled):not(.blur):not(.blurred):not(.arrived):not(.leave):not(.left)'];
// .leave will be added after loosing arrive and will be removed after leaving-animation done:
const selectorIsLeaving = '.leave';
// if all above are not set => left
// optionally use .left to kill [:hover || (.focused || .focus || :focus)]:
const selectorIsLeft = [':not(.arrived):not(.arrive):not(:hover):not(.focused):not(.focus):not(:focus):not(.leave)',
    ':not(.arrived):not(.arrive):not(:hover).blur:not(.leave)',
    ':not(.arrived):not(.arrive):not(:hover).blurred:not(.leave)',
    ':not(.arrived):not(.arrive).disabled:not(.leave)',
    ':not(.arrived):not(.arrive).disable:not(.leave)',
    ':not(.arrived):not(.arrive):disabled:not(.leave)',
    '.left'];
export const isArrived = (styles) => rule(selectorIsArrived, styles);
export const isArriving = (styles) => rule(selectorIsArriving, styles);
export const isLeaving = (styles) => rule(selectorIsLeaving, styles);
export const isLeft = (styles) => rule(selectorIsLeft, styles);
export const isArrive = (styles) => rule([selectorIsArriving, selectorIsArrived], styles);
export const isLeave = (styles) => rule([selectorIsLeaving, selectorIsLeft], styles);
export const isArriveLeaving = (styles) => rule([selectorIsArriving, selectorIsArrived, selectorIsLeaving], styles);
/**
 * Uses arrive (hover) & leave states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents arrive (hover) & leave state definitions.
 */
export const usesArriveLeaveState = () => {
    return [
        () => composition([
            states([
                isArrived([
                    vars({
                        [arriveLeaveDecls.filter]: cssProps.filterArrive,
                    }),
                ]),
                isArriving([
                    vars({
                        [arriveLeaveDecls.filter]: cssProps.filterArrive,
                        [arriveLeaveDecls.anim]: cssProps.animArrive,
                    }),
                ]),
                isLeaving([
                    vars({
                        [arriveLeaveDecls.filter]: cssProps.filterArrive,
                        [arriveLeaveDecls.anim]: cssProps.animLeave,
                    }),
                ]),
            ]),
        ]),
        arriveLeaveRefs,
        arriveLeaveDecls,
    ];
};
export const useArriveLeaveState = (props, focusBlurState) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    // states:
    const [arrived, setArrived] = useState(false); // true => arrive, false => leave
    const [animating, setAnimating] = useState(null); // null => no-animation, true => arriving-animation, false => leaving-animation
    const [hoverDn, setHoverDn] = useState(false); // uncontrollable (dynamic) state: true => user hover, false => user leave
    /*
     * state is always leave if disabled
     * state is arrive/leave based on [controllable arrive] (if set) and fallback to ([uncontrollable hover] || [uncontrollable focus])
     */
    const arriveFn = propEnabled && (props.arrive /*controllable*/ ?? (hoverDn /*uncontrollable*/ || focusBlurState.focus /*uncontrollable*/));
    if (arrived !== arriveFn) { // change detected => apply the change & start animating
        setArrived(arriveFn); // remember the last change
        setAnimating(arriveFn); // start arriving-animation/leaving-animation
    }
    const handleHover = () => {
        if (!propEnabled)
            return; // control is disabled => no response required
        setHoverDn(true);
    };
    const handleLeave = () => {
        if (!propEnabled)
            return; // control is disabled => no response required
        setHoverDn(false);
    };
    const handleIdle = () => {
        // clean up finished animation
        setAnimating(null); // stop arriving-animation/leaving-animation
    };
    return {
        arrive: arrived,
        class: (() => {
            if (animating === true) {
                // arriving by controllable prop => use class .arrive
                if (props.arrive !== undefined)
                    return 'arrive';
                // otherwise use a combination of :hover || (.focused || .focus || :focus)
                return null;
            } // if
            // leaving:
            if (animating === false)
                return 'leave';
            // fully arrived:
            if (arrived)
                return 'arrived';
            // fully left:
            if (props.arrive !== undefined) {
                return 'left'; // arriving by controllable prop => use class .left to kill [:hover || (.focused || .focus || :focus)]
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        handleMouseEnter: handleHover,
        handleMouseLeave: handleLeave,
        handleAnimationEnd: (e) => {
            if (e.target !== e.currentTarget)
                return; // no bubbling
            if (/((?<![a-z])(arrive|leave)|(?<=[a-z])(Arrive|Leave))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
//#endregion arriveLeave
// styles:
export const usesControlLayout = () => {
    return composition([
        imports([
            // resets:
            stripoutControl(),
            // layouts:
            usesIndicatorLayout(),
            // colors:
            usesThemeDefault(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesControlVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    return composition([
        imports([
            // variants:
            usesIndicatorVariants(),
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesControlStates = () => {
    // dependencies:
    // states:
    const [focusBlur] = usesFocusBlurState();
    const [arriveLeave] = usesArriveLeaveState();
    return composition([
        imports([
            // states:
            usesIndicatorStates(),
            focusBlur(),
            arriveLeave(),
        ]),
        states([
            isDisable([
                layout({
                    // accessibilities:
                    cursor: cssProps.cursorDisable,
                }),
            ]),
            isActive([
                imports([
                    markActive(),
                ]),
            ]),
            isFocus([
                imports([
                    markActive(),
                ]),
            ]),
            isArrive([
                imports([
                    markActive(),
                ]),
            ]),
            isFocus([
                layout({
                    zIndex: 2, // prevents boxShadowFocus from clipping
                }),
            ]),
            isBlurring([
                layout({
                    zIndex: 1, // prevents boxShadowFocus from clipping but below the active one
                }),
            ]),
        ]),
    ]);
};
export const usesControl = () => {
    return composition([
        imports([
            // layouts:
            usesControlLayout(),
            // variants:
            usesControlVariants(),
            // states:
            usesControlStates(),
        ]),
    ]);
};
export const useControlSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesControl(),
        ]),
    ]),
]);
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const boxShadows = propsManager.boxShadows();
    const filters = propsManager.filters();
    const [, { boxShadow: boxShadowFocusBlur }] = usesFocusBlurState();
    const [, { filter: filterArriveLeave }] = usesArriveLeaveState();
    //#region keyframes
    const keyframesFocus = {
        from: {
            boxShadow: [[[
                        ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),
                        // boxShadowFocusBlur, // missing the last => let's the browser interpolated it
                    ].map(fallbackNoneBoxShadow)]],
        },
        to: {
            boxShadow: [[[
                        ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),
                        boxShadowFocusBlur, // existing the last => let's the browser interpolated it
                    ].map(fallbackNoneBoxShadow)]],
        },
    };
    const keyframesBlur = {
        from: keyframesFocus.to,
        to: keyframesFocus.from,
    };
    const keyframesArrive = {
        from: {
            filter: [[
                    ...filters.filter((f) => (f !== filterArriveLeave)),
                    // filterArriveLeave, // missing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
        to: {
            filter: [[
                    ...filters.filter((f) => (f !== filterArriveLeave)),
                    filterArriveLeave, // existing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
    };
    const keyframesLeave = {
        from: keyframesArrive.to,
        to: keyframesArrive.from,
    };
    //#endregion keyframes
    return {
        // accessibilities:
        cursorDisable: 'not-allowed',
        //#region animations
        boxShadowFocus: [[0, 0, 0, '0.25rem']],
        filterArrive: [['brightness(85%)', 'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))']],
        '@keyframes focus': keyframesFocus,
        '@keyframes blur': keyframesBlur,
        '@keyframes arrive': keyframesArrive,
        '@keyframes leave': keyframesLeave,
        animFocus: [['150ms', 'ease-out', 'both', keyframesFocus]],
        animBlur: [['300ms', 'ease-out', 'both', keyframesBlur]],
        animArrive: [['150ms', 'ease-out', 'both', keyframesArrive]],
        animLeave: [['300ms', 'ease-out', 'both', keyframesLeave]],
        //#endregion animations
    };
}, { prefix: 'ctrl' });
export function Control(props) {
    // styles:
    const sheet = useControlSheet();
    // states:
    const focusBlurState = useFocusBlurState(props);
    const arriveLeaveState = useArriveLeaveState(props, focusBlurState);
    // fn props:
    const propEnabled = usePropEnabled(props);
    // jsx:
    return (<Indicator 
    // other props:
    {...props} 
    // classes:
    mainClass={props.mainClass ?? sheet.main} stateClasses={[...(props.stateClasses ?? []),
            focusBlurState.class,
            arriveLeaveState.class,
        ]} 
    // Control props:
    {...{
        // accessibilities:
        tabIndex: props.tabIndex ?? (propEnabled ? 0 : -1),
    }} 
    // events:
    onFocus={(e) => { props.onFocus?.(e); focusBlurState.handleFocus(); }} onBlur={(e) => { props.onBlur?.(e); focusBlurState.handleBlur(); }} onMouseEnter={(e) => { props.onMouseEnter?.(e); arriveLeaveState.handleMouseEnter(); }} onMouseLeave={(e) => { props.onMouseLeave?.(e); arriveLeaveState.handleMouseLeave(); }} onAnimationEnd={(e) => {
            props.onAnimationEnd?.(e);
            // states:
            focusBlurState.handleAnimationEnd(e);
            arriveLeaveState.handleAnimationEnd(e);
        }}/>);
}
export { Control as default };
