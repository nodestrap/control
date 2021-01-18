import React from 'react';
import Base, { Props as Base_Props, State as Base_State } from '@nodestrap/element/src/index';
import './index.scss';



export interface Props extends Base_Props {
    active?  : boolean;
    enabled? : boolean;
}

export interface State extends Base_State {
    focus    : boolean;
    blur     : boolean;

    actived  : boolean;
    active   : boolean;
    passive  : boolean;

    enabled  : boolean;
    enable   : boolean;
    disable  : boolean;
}

export default class Control<TProps extends Props, TState extends State> extends Base<TProps, TState> {
    constructor(props: TProps) {
        super(props);


        const state   = this.state;
        
        state.focus   = false;
        state.blur    = false;

        state.actived = props.active ?? true;
        state.active  = false;
        state.passive = false;

        state.enabled = props.enabled ?? true;
        state.enable  = false;
        state.disable = false;
    }



    /**
     * get the state of activability of current control.
     * @returns true indicates the current control is activated, or false indicates the current control is deactivated.
     */
    get active(): boolean {
        const state = this.state;
        return state.actived || state.active || (!state.passive);
    }

    /**
     * set the state of activability of current control.
     * @param active : set true to activate this element, or false to deactivate it.
     */
    set active(active: boolean) {
        if (active == this.active) return;

        this.setState({
            actived : false,
            active  : active,
            passive : !active,
        });
    }


    /**
     * get the state of enability of current control.
     * @returns true indicates the current control is enabled, or false indicates the current control is not enabled (disabled).
     */
    get enabled(): boolean {
        const state = this.state;
        return state.enabled || state.enable || (!state.disable);
    }

    /**
     * set the state of enability of current control.
     * @param enabled : set true to enable this element, or false to not enable (disable) it.
     */
    set enabled(enabled: boolean) {
        if (enabled == this.enabled) return;

        this.setState({
            enabled : false,
            enable  : enabled,
            disable : !enabled,
        });
    }



    /*override*/ get compositeClassName(): string {
        const state = this.state;
        return [
            super.compositeClassName,
            (state.focus  && '')        ?? (state.blur    && 'blur')     ?? '',
            (state.active && 'active')  ?? (state.passive && 'passive')  ?? (state.actived && 'actived') ?? '',
            (state.enable && 'enabled') ?? (state.disable && 'disabled') ?? '',
        ].join(' ');
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
        if (e.type == 'click') this.active = true;
    }
    handleMouseUp(e: React.MouseEvent) {
        if (e.type == 'click') this.active = false;
    }

    handleKeyDown(e: React.KeyboardEvent) {
        if (e.type == ' ') this.active = true;
    }
    handleKeyUp(e: React.KeyboardEvent) {
        if (e.type == ' ') this.active = false;
    }

    /*override*/ handleAnimationEnd(e: React.AnimationEvent) {
        super.handleAnimationEnd(e);

        this.setState({
            blur    : false, // clean up blurring animation

            actived : this.active, // remember this.active into state.actived
            active  : false, // clean up activating animation
            passive : false, // clean up passivating animation

            enabled : this.enabled, // remember this.enabled into state.enabled
            enable  : false, // clean up enabling animation
            disable : false, // clean up disabling animation
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
                {this.props.children || 'abstract class control'}
            </button>
        );
    }
}