'use client';

import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import { navMenus } from '@/constants/navMenus';
import Logo from '../common/logo/Logo';
import styles from './Header.module.scss';

const Header = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'header');
  return (
    <header className={styles['header-nav']}>
      <div className={styles['nav-box']}>
        <Logo lng={lng} />
        <div className={styles.align}>
          <nav className={`${styles['menu-box']} ${lng === 'ko' && styles.ko}`}>
            {navMenus.map((menu) => (
              <Link
                data-text={menu}
                href={`/${lng}/${menu}`}
                key={menu}
                className={styles.menu}
              >
                <span className={styles.highlight} />
                {t(menu)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
