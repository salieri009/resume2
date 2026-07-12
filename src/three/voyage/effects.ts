import * as THREE from 'three';

interface WakeRing {
  mesh: THREE.Mesh;
  age: number;
}

export interface WakePool {
  group: THREE.Group;
  /** Spawn a ring — rate-limited to one per 140 ms unless `force` is set. */
  spawn(now: number, x: number, y: number, z: number, force?: boolean): void;
  update(): void;
}

export function makeWakePool(): WakePool {
  const group = new THREE.Group();
  const pool: WakeRing[] = [];
  for (let i = 0; i < 12; i++) {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.22, 16),
      new THREE.MeshBasicMaterial({
        color: 0xe8f0f8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.visible = false;
    group.add(mesh);
    pool.push({ mesh, age: 999 });
  }
  let lastSpawn = 0;

  return {
    group,
    spawn(now, x, y, z, force = false) {
      if (!force && now - lastSpawn <= 140) return;
      lastSpawn = now;
      const slot = pool.find((w) => w.age > 1.2) ?? pool[0];
      slot.mesh.position.set(x, y, z);
      slot.mesh.scale.setScalar(0.35);
      slot.mesh.visible = true;
      (slot.mesh.material as THREE.MeshBasicMaterial).opacity = 0.38;
      slot.age = 0;
    },
    update() {
      pool.forEach((w) => {
        if (!w.mesh.visible) return;
        w.age += 0.016;
        const s = 0.35 + w.age * 1.4;
        w.mesh.scale.setScalar(s);
        (w.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.38 - w.age * 0.22);
        if (w.age > 1.8) w.mesh.visible = false;
      });
    },
  };
}
