import styled from 'styled-components'

export const StyledTrigger = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid #333;
`

export const StyledColorPicker = styled.div`
  position: absolute;
  width: 262px;
  color: ${props => props.theme.tc};
  background: ${props => props.theme.bgColor};
  border-radius: 4px;
  box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, 0.11);
  box-sizing: border-box;
  font-size: 12px;
  text-align: left;
  z-index: 1;

  * {
    box-sizing: border-box;
  }

  input {
    outline: none;
  }

  .header-text {
    font-size: 12px;
    line-height: 1;
    font-weight: normal;
  }

  .input-section {
    display: flex;
    // justify-content: space-between;
    padding-right: 1px;
    margin-top: 10px;
    margin-bottom: 12px;
    height: 26px;
    line-height: 26px;

    .text {
      width: 50px;
      border: none;
      outline: none;
    }

    .hex-input {
      width: 120px;

      input {
        padding-left: 20px;
      }

      &::before, input::before {
        display: inline-block;
        content: '#';
        font-size: 22px;
        position: absolute;
        width: 20px;
        text-align: center;
        color: ${props => props.theme.darkTc};
        transform: scale(0.5);
      }
    }
  }

  .color-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 14px;

    .icon {
      box-sizing: content-box;
      width: 10px;
      cursor: pointer;

      path {
        fill: ${props => props.theme.darkTc};
      }

      &:hover path {
        fill: ${props => props.theme.icon.close.hover};
      }
    }
  }

  .color-picker-body {
    padding: 0 10px;
  }
`

export const StyledRGBInput = styled.label`
  & {
    width: 60px;

    &.alpha-input {
      position: relative;
      width: 70px;

      input {
        padding: 0 15px 0 2px;
      }

      &::after {
        content: '%';
        position: absolute;
        top: 0;
        right: 6px;
        width: 10%;
      }
    }

    span {
      display: block;
      line-height: 12px;
      margin-top: 4px;
      color: ${props => props.theme.darkTc};
      text-align: center;
    }

    input {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      // background: ${props => props.theme.input.bg};
      border: 1px solid transparent;
      background: transparent;
      color: ${props => props.theme.lightTc};
      align-self: stretch;
      overflow: hidden;
      transition: 0.2s ease-out;
      transition-property: border, box-shadow;

      &:hover {
        border-color: ${props => props.theme.input.hover.border};
      }

      &:focus {
        border-color: ${props => props.theme.input.hover.border};
        // box-shadow: 0 0 6px 0 rgba(30, 152, 234, 0.5);
        border-width: 1px;
      }

      &.invalid {
        border-color: #e84030;
        // box-shadow: 0 0 6px 0 rgba(232, 64, 48, 0.5);
        border-width: 1px;
      }
    }
  }
`

const planeHeight = '130px'

export const StyledHSVPicker = styled.div`
  .color-plane {
    position: relative; 
    height: ${planeHeight};
  }

  .h-band {
    position: absolute!important;
    width: 10px;
    height: ${planeHeight};
    // transform: rotate(90deg) translateX(100%);
    // transform-origin: top right;
    right: 5px;
    top: 0;
    margin-bottom: 4px;
    background-image: linear-gradient(to bottom, red, #ff0080, magenta, #8000ff, blue, #0080ff, cyan, #00ff80, lime, #80ff00, yellow, #ff8000, red);
  }

  .s-v-plane {
    position: relative;
    width: calc(100% - 20px);
    height: 100%;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    background-clip: content-box;
    overflow: hidden;

    .pointer {
      position: absolute;
      width: 10px;
      height: 10px;
      margin: calc(-10px / 2);
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
      border: 1px solid white;
      border-radius: 50%;
      pointer-events: none;
    }

    .base-hue-layer,
    .s-layer,
    .v-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .s-layer {
      -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=1,startColorstr='#ffffff', endColorstr='#00ffffff')";
      background: -moz-linear-gradient(left, white 0%, rgba(255, 255, 255, 0) 100%);
      background: -webkit-gradient(linear, left top, right top, color-stop(0%, white), color-stop(100%, rgba(255, 255, 255, 0)));
      background: -webkit-linear-gradient(left, white 0%, rgba(255, 255, 255, 0) 100%);
      background: -o-linear-gradient(left, white 0%, rgba(255, 255, 255, 0) 100%);
      background: -ms-linear-gradient(left, white 0%, rgba(255, 255, 255, 0) 100%);
      background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1,startColorstr='#ffffff', endColorstr='#00ffffff');
    }

    .v-layer {
      -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#00000000', endColorstr='#000000')";
      background: -moz-linear-gradient(top, transparent 0%, black 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, transparent), color-stop(100%, black));
      background: -webkit-linear-gradient(top, transparent 0%, black 100%);
      background: -o-linear-gradient(top, transparent 0%, black 100%);
      background: -ms-linear-gradient(top, transparent 0%, black 100%);
      background: linear-gradient(to bottom, transparent 0%, black 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#000000',GradientType=0 );
    }
  }

  .row {
    display: flex;
    align-items: center;
  }

  .outside-color-picker-btn {
    width: 24px;
    height: 24px;
    margin-top: 8px;
    margin-right: 8px;
    cursor: pointer;
    background-color: ${props => props.theme.icon.piker.bg};
    // border: 1px solid ${props => props.theme.icon.piker.border};
    border-radius: 2px;
    // box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;

    .system-color-picker-wrapper {
      path {
        fill: ${props => props.theme.lightTc};
      }
    }
  }

  // .a-band {
  // }

  .h-band,
  .a-band {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 999px;
    cursor: pointer;
    background-clip: padding-box;

    .rail {
      position: absolute;
      top: 1px;
      bottom: 1px;
      left: calc(5px / 2 + 1px);
      right: calc(5px / 2 + 1px);
    }

    .color-rail {
      height: calc(100% - 8px);
      top: 0;
      bottom: 0;
      margin: auto;
    }

    .alpha-slider,
    .color-slider {
      position: absolute;
      top: -3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #fff;
      background: transparent;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
    }

    .alpha-slider {
      margin-top: 0;
      margin-left: -6px;
    }

    .color-slider {
      margin-top: -6px;
      margin-left: -5px;
    }
  }

  .a-band {
    flex: 1;
    margin-top: 8px;
    margin-right: 8px;
    height: 10px;
    background-image:
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 6px 6px;
    background-position: 0 0, 0 3px, 3px -3px, -3px 0;
  }
`