interface BusinessAvatarProps {
  letter: string;
}

/** Placeholder avatar — set `--business-avatar-fill` in CSS to theme. */
export default function BusinessAvatar({ letter }: BusinessAvatarProps) {
  return (
    <div className="business-avatar">
      <span className="business-avatar__letter">{letter}</span>
    </div>
  );
}
