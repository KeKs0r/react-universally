/*
import velocity_animate from 'velocity-animate';
import velocity_ui from 'velocity-animate/velocity.ui';
import { velocityHelpers } from 'velocity-react';



// export default function registerTransitions(){
//   velocityHelpers.registerEffect(TRANSITIONS_TWIRL, {
//       defaultDuration: 3000,
//       calls: [
//         [ { rotateZ: 1080 }, 0.50 ],
//         [ { scaleX: 0.5 }, 0.25, { easing: "spring" } ],
//         [ { scaleX: 1 }, 0.25, { easing: "spring" } ]
//       ]
//   });
// }

    const Animations = {

      incoming: velocityHelpers.registerEffect({
        defaultDuration: 2000,
        calls: [
            [ { opacity: [ 1, 0 ] , translateY: [ 0, -800 ]}, 1.5 , {easing: 'easeInSine' } ]
        ]
      }),

      slideDownExit: velocityHelpers.registerEffect({
        defaultDuration: 1000,
        calls: [
            [ { opacity: [ 0, "easeInCirc", 1 ], translateY: 1000 }, 0.80 ]
        ]
      }),

      up: velocityHelpers.registerEffect({
        defaultDuration: 200,
        calls: [
          [{
            transformOriginX: [ '50%', '50%' ],
            transformOriginY: [ 0, 0 ],
            rotateX: 160,
          }]
        ],
      })

    };
*/

    export const TRANSITIONS  = {
        fadeIn: 'transition.fadeIn',
        whirlIn: 'transition.whirlIn',
        whirlOut: 'transition.whirlOut',
        bounceOut: 'transition.bounceUpOut',
        bounceDown: 'transition.bounceDownOut',
        flipIn: 'transition.flipXIn',
        slideUpIn: 'transition.slideUpBigIn',
        slideDownIn: 'transition.slideDownBigIn',
        slideDownOut: 'transition.slideDownBigOut',
        flipOut: 'transition.flipXOut',
        swoopIn: 'transition.swoopIn',
        swoopOut: 'transition.swoopOut',
        /*
        custom: Animations.incoming ,
        slideDownExit: Animations.slideDownExit
        */
    }
