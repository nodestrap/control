import React from 'react';
import Base, {
    VariantSize  as Base_VariantSize,
    VariantTheme as Base_VariantTheme,
    Props        as Base_Props,
    State        as Base_State
} from '@nodestrap/element/src/index';
import './index.scss';



export interface VariantSize  extends Base_VariantSize  { }
export interface VariantTheme extends Base_VariantTheme { }



export interface Props extends Base_Props {
    active?     : boolean;
    enabled?    : boolean;
}

export interface State extends Base_State {
    focus       : boolean;
    blur        : boolean;

    actived?    : boolean;
    activating  : boolean;
    passivating : boolean;

    enabled?    : boolean;
    enabling    : boolean;
    disabling   : boolean;
}

const activeDefault = false;
const enableDefault = true;

export default class Control<TProps extends Props = Props, TState extends State = State> extends Base<TProps, TState> {
    constructor(props: TProps) {
        super(props);


        const state       = this.state;
        
        state.focus       = false;
        state.blur        = false;

        state.actived     = props.active ?? activeDefault;
        state.activating  = false; // no running animation
        state.passivating = false; // no running animation

        state.enabled     = props.enabled ?? enableDefault;
        state.enabling    = false; // no running animation
        state.disabling   = false; // no running animation
    }



    /**
     * get the state of activability of current control.
     * @returns true indicates the current control is activated, or false indicates the current control is deactivated.
     */
    get active(): boolean {
        const state = this.state;
        return state.actived ?? (state.activating || (state.passivating ? false : activeDefault));
    }

    /**
     * set the state of activability of current control.
     * @param active : set true to activate this element, or false to deactivate it.
     */
    set active(active: boolean) {
        if (active == this.active) return; // already the same state => no changing needed

        this.setState({
            actived     : undefined,
            activating  : active,
            passivating : !active,
        });
    }


    /**
     * get the state of enability of current control.
     * @returns true indicates the current control is enabled, or false indicates the current control is not enabled (disabled).
     */
    get enabled(): boolean {
        const state = this.state;
        return state.enabled ?? (state.enabling || (state.disabling ? false : enableDefault));
    }

    /**
     * set the state of enability of current control.
     * @param enabled : set true to enable this element, or false to not enable (disable) it.
     */
    set enabled(enabled: boolean) {
        if (enabled == this.enabled) return; // already the same state => no changing needed

        this.setState({
            enabled   : undefined,
            enabling  : enabled,
            disabling : !enabled,
        });
    }



    /*override*/ get compositeClassName(): string {
        const state = this.state;
        return [
            super.compositeClassName,

            
                                                      (state.focus      && ' ')       || (state.blur        && 'blur')     || ' ',

            ((state.actived !== undefined) &&
             (state.actived ? 'actived' : ' '))    || (state.activating && 'active')  || (state.passivating && 'passive')  || ' ',

            ((state.enabled !== undefined) && ' ') || (state.enabling   && 'enabled') || (state.disabling   && 'disabled') || ' ',
        ]
        .filter(c => (c != ' ') && (c != '')) // removes blank classes
        .join(' '); // combines all classes separated by space
    }



    handleFocus(e: React.FocusEvent) {
        this.setState({
            focus   : true,
            blur    : false,
        });
    }
    handleBlur(e: React.FocusEvent) {
        this.setState({
            focus   : false,
            blur    : true,
        });
    }

    handleMouseDown(e: React.MouseEvent) {
        if (e.button == 0) this.active = true;
    }
    handleMouseUp(e: React.MouseEvent) {
        if (e.button == 0) this.active = false;
    }

    handleKeyDown(e: React.KeyboardEvent) {
        if (e.key == ' ') this.active = true;
    }
    handleKeyUp(e: React.KeyboardEvent) {
        if (e.key == ' ') this.active = false;
    }

    /*override*/ handleAnimationEnd(e: React.AnimationEvent) {
        super.handleAnimationEnd(e);

        this.setState({
            blur        : false,        // clean up blurring animation

            actived     : this.active, // save the final state
            activating  : false,        // clean up activating animation
            passivating : false,        // clean up passivating animation

            enabled     : this.enabled, // save the final state
            enabling    : false,        // clean up enabling animation
            disabling   : false,        // clean up disabling animation
        });
    }



    render() {
        return (
            <button
                className={this.compositeClassName}
                
                disabled={!this.enabled}


                onMouseEnter={(e)   => this.handleMouseEnter(e)}
                onMouseLeave={(e)   => this.handleMouseLeave(e)}

                onFocus={(e)        => this.handleFocus(e)}
                onBlur={(e)         => this.handleBlur(e)}

                onMouseDown={(e)    => this.handleMouseDown(e)}
                onMouseUp={(e)      => this.handleMouseUp(e)}

                onKeyDown={(e)      => this.handleKeyDown(e)}
                onKeyUp={(e)        => this.handleKeyUp(e)}

                onAnimationEnd={(e) => this.handleAnimationEnd(e)}
            >
                {this.props.children ?? 'abstract class control'}
            </button>
        );
    }
}