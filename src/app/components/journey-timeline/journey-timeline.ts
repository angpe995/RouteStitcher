import { Component, Input } from '@angular/core';
import { JourneySegment } from '../connection-card/connection.model';
import { NgClass } from '@angular/common';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../connection-card/connection.model';
@Component({
  selector: 'app-journey-timeline',
  imports: [NgClass],
  templateUrl: './journey-timeline.html',
  styleUrl: './journey-timeline.scss',
})
export class JourneyTimeline {
  @Input({ required: true }) segments: JourneySegment[] = [];
  getBrandColor(brand: Brand): string {
    return brand.color;
  }
  getSegmentStatus(current: JourneySegment, previous: JourneySegment | null): string {
    if (!previous) {
      return current.hasSeat ? 'normal' : 'standing';
    }
    if (current.trainId !== previous.trainId) {
      return 'transfer';
    }
    if (!current.hasSeat) {
      return 'standing';
    }

    if (
      previous.hasSeat &&
      (current.seatInfo?.seat !== previous.seatInfo?.seat ||
        current.seatInfo?.car !== previous.seatInfo?.car)
    ) {
      return 'seat-changed';
    }

    return 'normal';
  }
  private isSeatChanged(a?: JourneySegment, b?: JourneySegment): boolean {
    if (!a || !b) return false;
    if (a.trainId !== b.trainId) return false;
    if (a.hasSeat !== b.hasSeat) return true;
    if (a.hasSeat && b.hasSeat && (a.seatInfo || b.seatInfo)) {
      return a.seatInfo?.car !== b.seatInfo?.car || a.seatInfo?.seat !== b.seatInfo?.seat;
    }
    return false;
  }

  getSegmentClass(index: number, isLast: boolean): string {
    const current = this.segments[index];
    if (!current) return '';

    const isFirst = index === 0;
    const type = current.hasSeat ? 'normal' : 'standing';
    const classes = [type];
    if (!isFirst && !isLast) {
      const prev = this.segments[index - 1];
      const next = this.segments[index + 1];

      const cutLeft = this.isSeatChanged(prev, current);
      const cutRight = this.isSeatChanged(current, next);

      if (cutLeft && cutRight) {
        classes.push('two', 'cut');
      } else if (cutRight) {
        classes.push(type === 'normal' ? 'even' : 'odd', 'cut');
      } else if (cutLeft) {
        classes.push('odd', 'cut');
      }
    } else {
      const neighbour = isLast ? this.segments[index - 1] : this.segments[index + 1];
      if (this.isSeatChanged(current, neighbour)) {
        if (type === 'normal') {
          classes.push(isLast ? 'odd' : 'even');
        } else {
          if(isLast) classes.push('odd');
          else classes.push('even');
        }
        classes.push('cut');
      }
    }

    return classes.join(' ');
  }
}
