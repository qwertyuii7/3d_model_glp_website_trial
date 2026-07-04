import React from 'react';
import { useStoryStore } from '../store/storyStore';

/**
 * StorySection — Meroe-style floating text. No cards, no glass. Just clean type on 3D.
 */
const alignPattern = ['', 'right', '', 'right', 'center'];

export const StorySection = React.memo(function StorySection({ scene, index, total }) {
  const activeSceneIndex = useStoryStore((s) => s.activeSceneIndex);
  const isActive = index === activeSceneIndex;
  const isNearby = Math.abs(index - activeSceneIndex) <= 1;

  let cls = 'story-body';
  if (isActive) cls += ' visible';
  else if (isNearby) cls += ' faded';

  return (
    <section className={`story ${alignPattern[index % alignPattern.length]}`} data-scene-index={index}>
      <div className={cls}>
        <div className="story-num">{String(index + 1).padStart(2, '0')}</div>
        <h2>{scene.title}</h2>
        <div className="story-sub">{scene.subtitle}</div>
        <p className="desc">{scene.description}</p>
      </div>
    </section>
  );
});
