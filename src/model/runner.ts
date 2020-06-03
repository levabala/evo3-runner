import { Simulation } from 'evo3-model';

export const sim = new Simulation(100, 60);

let lastTime = Date.now();
const timeForFrame = 64;
const timeBetweenTicks = 16;

const tick = () => {
  lastTime = Date.now();
  while (
    Date.now() - lastTime <
    ((window as any).timeForFrame || timeForFrame)
  ) {
    while (sim.creatures.length < 15) sim.spawnRandomCreature();

    sim.tick();
    sim.spawnRandomCreature();
  }

  setTimeout(
    () => tick(),
    (window as any).timeBetweenTicks || timeBetweenTicks
  );
};
tick();
// setInterval(() => console.log((sim as any).ticksPast), 1000);

sim.tick();

(window as any).sim = sim;

sim.spawnRandomCreature();
sim.spawnRandomCreature();
sim.spawnRandomCreature();
sim.spawnRandomCreature();
sim.spawnRandomCreature();
