import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import { LngProps } from '@/types/lngSwitch';
import { useAfterSeconds } from '@/hooks/useAfterSeconds';
import { useCardMove } from '@/hooks/useCardMove';
import styles from './Card.module.scss';

const Card3D = React.memo(({ lng }: LngProps) => {
  const { t } = useTranslation(lng, 'contacts');
  const { wrap } = useCardMove();
  const { isMounting } = useAfterSeconds(800);

  return (
    <div ref={wrap} className={`${styles['content-box']} ${styles.active}`}>
      {isMounting && (
        <>
          <div className={`front ${styles.front}`}>
            <div className={`${styles.title1} ${lng === 'en' && styles.en1}`}>
              {t('thankYou')}
            </div>
            <div className={`${styles.title2} ${lng === 'en' && styles.en2}`}>
              {t('forVisiting')}
            </div>
            <div className={styles.heart} />
            <div className={styles.ground1} />
            <div className={styles.ground2} />
            <div className={styles['big-pine']} />
            <div className={styles.ground3} />
            <div className={styles.pine} />
            <div className={styles.mango} />
          </div>
          <div className={styles.back} />
        </>
      )}
    </div>
  );
});

export default Card3D;
