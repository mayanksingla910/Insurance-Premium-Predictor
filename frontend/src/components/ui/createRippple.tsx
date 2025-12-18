export function createRipple(
  event: React.MouseEvent<HTMLElement>
) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const ripple = document.createElement("span");
  ripple.className = "ripple";

  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;

  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}
