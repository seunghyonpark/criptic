import React, { useRef, useEffect } from 'react';

import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();

  const { scene, animations } = useGLTF('./models/roan.glb');
  const { actions, mixer } = useAnimations(animations, group);

  //console.log(animations);
  //console.log(actions);

  // animation clip name
  // "yearling_breathing_idle"
  // "yearling_feeding_idle"
  // "yearling_brushing_idle"
  // "yearling_petting_idle"
  // "yearling_laying_down_idle"
  // "yearling_walk_idle"
  // "yearling_gallop_idle"
  // "yearling_canter_idle"
  // "yearling_trot_idle"

  useEffect(() => {
    //console.log(actions)

    //actions.EyeMovement.play()

    actions?.yearling_gallop_idle?.play();
  }, [actions]);

  useEffect(() => {
    //actions.Animation.play();
  }, [mixer]);

  return (
    <>
      <primitive ref={group} object={scene} dispose={null} scale={0.4} />
    </>
  );
}

useGLTF.preload('./models/roan.glb');
