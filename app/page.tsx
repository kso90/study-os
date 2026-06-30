"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";

const FEATURES = [
  { name: "Smart Planner", desc: "AI schedules your week around your energy levels and deadlines.", color: "#ff6445" },
  { name: "Focus Shield", desc: "Filters YouTube & Instagram during study sessions — not blocks them.", color: "#e3a164" },
  { name: "Knowledge Map", desc: "Track mastery across every subject and topic in real time.", color: "#87663e" },
  { name: "Boss Battles", desc: "Answer questions to defeat bosses with your study group.", color: "#e2ab9a" },
  { name: "Study Buddy", desc: "Floating Pomodoro timer that follows you across every page.", color: "#ff6445" },
  { name: "Daily Check-in", desc: "Log mood + energy so the AI adapts your plan to how you feel.", color: "#e3a164" },
];

export default function LandingPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [popupFeature, setPopupFeature] = useState<number | null>(null);
  const stateRef = useRef({ mouse: new THREE.Vector2(), scroll: 0, popupFeature: null as number | null });

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const c = container;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(0, 1.5, 9);

    scene.add(new THREE.AmbientLight(0xfff8f0, 0.7));
    const sun = new THREE.DirectionalLight(0xffe8cc, 2.5);
    sun.position.set(5, 8, 6);
    sun.castShadow = true;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xffccaa, 0.8);
    fill.position.set(-4, 2, -3);
    scene.add(fill);
    const rim = new THREE.PointLight(0xff6445, 1.2, 20);
    rim.position.set(-3, 4, 2);
    scene.add(rim);

    // ── Cat ──────────────────────────────────────────────────────
    const catGroup = new THREE.Group();
    scene.add(catGroup);

    const bodyMat = new THREE.MeshPhongMaterial({ color: 0x87663e, flatShading: true });
    const earMat = new THREE.MeshPhongMaterial({ color: 0x6b4f2e, flatShading: true });
    const innerEarMat = new THREE.MeshPhongMaterial({ color: 0xe2ab9a, flatShading: true });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 1.0), bodyMat);
    body.position.y = -0.3;
    catGroup.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.72, 6, 5), bodyMat);
    head.position.y = 0.72;
    catGroup.add(head);

    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.42, 4), earMat);
      ear.position.set(side * 0.42, 1.3, 0);
      ear.rotation.z = side * 0.18;
      catGroup.add(ear);
      const innerEar = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 4), innerEarMat);
      innerEar.position.set(side * 0.42, 1.3, 0.05);
      innerEar.rotation.z = side * 0.18;
      catGroup.add(innerEar);

      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshPhongMaterial({ color: 0x333130 }));
      eye.position.set(side * 0.26, 0.8, 0.65);
      catGroup.add(eye);
      const shine = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      shine.position.set(side * 0.29, 0.83, 0.72);
      catGroup.add(shine);

      const paw = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.44), bodyMat);
      paw.position.set(side * 0.42, -0.92, 0.3);
      catGroup.add(paw);
    }

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), new THREE.MeshPhongMaterial({ color: 0xff6445 }));
    nose.position.set(0, 0.68, 0.7);
    catGroup.add(nose);

    const tailCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.5, -0.75, 0),
      new THREE.Vector3(1.4, -0.3, 0.2),
      new THREE.Vector3(0.9, 0.3, 0.1)
    );
    const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 12, 0.09, 6, false), bodyMat);
    catGroup.add(tail);
    catGroup.position.set(0, 0.2, 0);

    // ── Glass boxes ──────────────────────────────────────────────
    const boxColors = [0xff6445, 0xe3a164, 0x87663e, 0xe2ab9a, 0xd4956a, 0xb07040];
    const boxMeshes: THREE.Mesh[] = [];
    const labelEls: HTMLDivElement[] = [];
    const glassGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);

    boxColors.forEach((col, i) => {
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: col, transparent: true, opacity: 0.18,
        roughness: 0.05, metalness: 0.1, transmission: 0.6,
        thickness: 0.5, envMapIntensity: 1.5, side: THREE.DoubleSide,
      });
      const box = new THREE.Mesh(glassGeo, glassMat);
      boxMeshes.push(box);
      scene.add(box);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(glassGeo),
        new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.5 })
      );
      box.add(edges);

      const el = document.createElement("div");
      el.style.cssText = `position:absolute;pointer-events:none;font-family:var(--font-gaegu),sans-serif;font-size:11px;font-weight:700;color:#fff8f0;background:rgba(51,49,48,0.7);padding:3px 8px;border-radius:20px;white-space:nowrap;transform:translate(-50%,-50%);transition:opacity 0.2s;letter-spacing:0.02em;`;
      el.textContent = FEATURES[i].name;
      container.appendChild(el);
      labelEls.push(el);
    });

    // ── Particles ────────────────────────────────────────────────
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const warmPalette = [new THREE.Color(0xff6445), new THREE.Color(0xe3a164), new THREE.Color(0xfff8f0), new THREE.Color(0xe2ab9a)];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      const c = warmPalette[Math.floor(Math.random() * warmPalette.length)];
      pColors[i * 3] = c.r; pColors[i * 3 + 1] = c.g; pColors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.7 }));
    scene.add(particles);

    // ── Bursts ───────────────────────────────────────────────────
    const bursts: { mesh: THREE.Points; vel: THREE.Vector3[]; life: number }[] = [];

    function spawnBurst(pos: THREE.Vector3) {
      const n = 30;
      const bPos = new Float32Array(n * 3);
      const vels: THREE.Vector3[] = [];
      for (let i = 0; i < n; i++) {
        bPos[i * 3] = pos.x; bPos[i * 3 + 1] = pos.y; bPos[i * 3 + 2] = pos.z;
        vels.push(new THREE.Vector3((Math.random() - 0.5) * 0.18, (Math.random() - 0.5) * 0.18, (Math.random() - 0.5) * 0.18));
      }
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute("position", new THREE.BufferAttribute(bPos, 3));
      const bMesh = new THREE.Points(bGeo, new THREE.PointsMaterial({ size: 0.1, color: 0xff6445, transparent: true, opacity: 1 }));
      scene.add(bMesh);
      bursts.push({ mesh: bMesh, vel: vels, life: 1 });
    }

    // ── Events ───────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();

    function onClick(e: MouseEvent) {
      const rect = c.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const hits = raycaster.intersectObjects(boxMeshes);
      if (hits.length > 0) {
        const idx = boxMeshes.indexOf(hits[0].object as THREE.Mesh);
        spawnBurst(hits[0].point);
        const next = stateRef.current.popupFeature === idx ? null : idx;
        stateRef.current.popupFeature = next;
        setPopupFeature(next);
      } else {
        stateRef.current.popupFeature = null;
        setPopupFeature(null);
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = c.getBoundingClientRect();
      stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onScroll() { stateRef.current.scroll = window.scrollY; }

    function onResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    container.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    // ── Loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    const projVec = new THREE.Vector3();

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const { mouse, scroll } = stateRef.current;
      const scrollFade = Math.max(0, 1 - scroll / 400);

      catGroup.rotation.y = Math.sin(t * 0.5) * 0.18 + mouse.x * 0.12;
      catGroup.rotation.x = mouse.y * 0.06;
      catGroup.position.y = 0.2 + Math.sin(t * 0.8) * 0.06;

      boxMeshes.forEach((box, i) => {
        const angle = t * 0.35 + (i / boxColors.length) * Math.PI * 2;
        box.position.x = Math.cos(angle) * 3.2 + mouse.x * 0.3;
        box.position.y = Math.sin(angle * 0.7 + i) * 1.2 + mouse.y * 0.15;
        box.position.z = Math.sin(angle) * 2.0 - 0.5;
        box.rotation.x = t * 0.4 + i;
        box.rotation.y = t * 0.3 + i;
        (box.material as THREE.MeshPhysicalMaterial).opacity = 0.18 * scrollFade;

        projVec.copy(box.position).project(camera);
        const rect = c.getBoundingClientRect();
        const lx = ((projVec.x + 1) / 2) * rect.width;
        const ly = ((-projVec.y + 1) / 2) * rect.height;
        const el = labelEls[i];
        el.style.left = `${lx}px`;
        el.style.top = `${ly - 42}px`;
        el.style.opacity = scrollFade > 0.2 ? String(scrollFade * 0.9) : "0";
      });

      (particles.material as THREE.PointsMaterial).opacity = 0.7 * scrollFade;
      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.008;

      for (let bi = bursts.length - 1; bi >= 0; bi--) {
        const b = bursts[bi];
        b.life -= 0.025;
        const pos = b.mesh.geometry.attributes.position.array as Float32Array;
        for (let pi = 0; pi < b.vel.length; pi++) {
          pos[pi * 3]     += b.vel[pi].x;
          pos[pi * 3 + 1] += b.vel[pi].y;
          pos[pi * 3 + 2] += b.vel[pi].z;
        }
        b.mesh.geometry.attributes.position.needsUpdate = true;
        (b.mesh.material as THREE.PointsMaterial).opacity = b.life;
        if (b.life <= 0) {
          scene.remove(b.mesh);
          b.mesh.geometry.dispose();
          bursts.splice(bi, 1);
        }
      }

      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.2 + 1.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      labelEls.forEach(el => { if (container.contains(el)) container.removeChild(el); });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ background: "#f5ede0", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div ref={canvasRef} style={{ position: "absolute", inset: 0, cursor: "pointer" }} />

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
          background: "linear-gradient(to bottom, transparent, #f5ede0)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            fontFamily: "var(--font-gaegu), sans-serif", fontSize: "16px", fontWeight: 700,
            color: "rgba(51,49,48,0.55)", letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "18px",
          }}>
            ✦ Study OS
          </div>

          <h1 style={{
            fontFamily: "var(--font-gaegu), sans-serif", fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 700, color: "#333130", textAlign: "center", lineHeight: 1.0,
            marginBottom: "20px", letterSpacing: "-0.01em",
          }}>
            Study smarter,<br />not harder.
          </h1>

          <p style={{
            fontFamily: "var(--font-nunito), sans-serif", fontSize: "clamp(16px, 2.2vw, 20px)",
            fontWeight: 600, color: "rgba(51,49,48,0.55)", textAlign: "center",
            maxWidth: "520px", lineHeight: 1.55, marginBottom: "36px",
          }}>
            AI-powered planner · Focus Shield · Boss Battles
            <br />A study OS built for students who want to win.
          </p>

          <div style={{ display: "flex", gap: "14px", alignItems: "center", pointerEvents: "auto" }}>
            <Link href="/dashboard" style={{
              fontFamily: "var(--font-gaegu), sans-serif", fontSize: "18px", fontWeight: 700,
              background: "#333130", color: "#fff8f0", padding: "14px 36px", borderRadius: "50px",
              textDecoration: "none", boxShadow: "3px 3px 0px rgba(51,49,48,0.25)",
            }}>
              Open Dashboard →
            </Link>
            <a href="#features" style={{
              fontFamily: "var(--font-gaegu), sans-serif", fontSize: "16px", fontWeight: 700,
              color: "#333130", padding: "14px 28px", borderRadius: "50px",
              textDecoration: "none", border: "2px solid rgba(51,49,48,0.2)",
              background: "rgba(255,248,240,0.6)", backdropFilter: "blur(8px)",
            }}>
              See Features
            </a>
          </div>

          <p style={{
            marginTop: "28px", fontSize: "12px", fontWeight: 600,
            color: "rgba(51,49,48,0.35)", fontFamily: "var(--font-nunito), sans-serif",
            letterSpacing: "0.05em",
          }}>
            click the glowing boxes to explore features
          </p>
        </div>

        {popupFeature !== null && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%) translateY(-40px)",
            background: "rgba(255,248,240,0.96)", backdropFilter: "blur(16px)",
            border: "2px solid rgba(51,49,48,0.12)", borderRadius: "20px",
            padding: "24px 32px", maxWidth: "300px", textAlign: "center",
            boxShadow: "4px 4px 0px rgba(51,49,48,0.15)",
            pointerEvents: "none", zIndex: 10,
          }}>
            <div style={{
              fontFamily: "var(--font-gaegu), sans-serif", fontSize: "22px", fontWeight: 700,
              color: FEATURES[popupFeature].color, marginBottom: "8px",
            }}>
              {FEATURES[popupFeature].name}
            </div>
            <p style={{
              fontFamily: "var(--font-nunito), sans-serif", fontSize: "14px",
              fontWeight: 600, color: "rgba(51,49,48,0.65)", lineHeight: 1.55,
            }}>
              {FEATURES[popupFeature].desc}
            </p>
          </div>
        )}

        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          animation: "arrowBob 2s ease-in-out infinite", pointerEvents: "none",
        }}>
          <span style={{
            fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-gaegu), sans-serif",
            color: "rgba(51,49,48,0.4)", letterSpacing: "0.1em",
          }}>scroll</span>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path d="M9 2 L9 16 M3 11 L9 18 L15 11" stroke="rgba(51,49,48,0.35)"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
          </svg>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "80px 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontFamily: "var(--font-gaegu), sans-serif", fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700, color: "#333130", marginBottom: "12px",
          }}>
            Everything you need to<br />actually study.
          </h2>
          <p style={{
            fontFamily: "var(--font-nunito), sans-serif", fontSize: "17px",
            fontWeight: 600, color: "rgba(51,49,48,0.5)",
          }}>
            Six tools, one app, zero excuses.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.name}
              onMouseEnter={() => setActiveFeature(i)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{
                background: activeFeature === i ? "#fff8f0" : "rgba(255,248,240,0.7)",
                border: `2px solid ${activeFeature === i ? f.color : "rgba(51,49,48,0.1)"}`,
                borderRadius: "24px", padding: "28px", cursor: "default", transition: "all 0.2s",
                boxShadow: activeFeature === i ? `3px 3px 0px ${f.color}40` : "none",
              }}
            >
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: f.color, marginBottom: "14px" }} />
              <div style={{ fontFamily: "var(--font-gaegu), sans-serif", fontSize: "22px", fontWeight: 700, color: "#333130", marginBottom: "8px" }}>
                {f.name}
              </div>
              <p style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: "14px", fontWeight: 600, color: "rgba(51,49,48,0.55)", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Link href="/dashboard" style={{
            fontFamily: "var(--font-gaegu), sans-serif", fontSize: "20px", fontWeight: 700,
            background: "#ff6445", color: "#fff8f0", padding: "16px 48px", borderRadius: "50px",
            textDecoration: "none", boxShadow: "3px 3px 0px #333130", display: "inline-block",
          }}>
            Start Studying Now ✦
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes arrowBob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </div>
  );
}
