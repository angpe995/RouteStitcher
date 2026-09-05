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
    return true;
  }

  getSegmentClass(index: number, isLast: boolean): string {
    const current = this.segments[index];

    if (!current) {
      return '';
    }

    const type = current.hasSeat ? 'normal' : 'standing';
    const classes = [type];

    const isFirst = index === 0;

    const prev = !isFirst ? this.segments[index - 1] : null;

    const next = !isLast ? this.segments[index + 1] : null;

    const cutLeft = !!prev && this.isSeatChanged(prev, current);
    const cutRight = !!next && this.isSeatChanged(current, next);
    if(prev)
    {
      console.log("prev:", this.isSeatChanged(prev, current));
    }
    if(next)
    {
      console.log("next:", this.isSeatChanged(current, next));
    }
    //console.log(this.isSeatChanged(prev, current), this.isSeatChanged(current, next));
    // Zmiana miejsca po obu stronach segmentu
    if (cutLeft && cutRight) {
      classes.push('two', 'cut');
    }

    // Zmiana miejsca po prawej
    else if (cutRight) {
      classes.push('even', 'cut');
    }

    // Zmiana miejsca po lewej
    else if (cutLeft) {
      classes.push('odd', 'cut');
    }

    console.log(`Segment ${index}:`, {
      type,
      cutLeft,
      cutRight,
      classes: classes.join(' '),
    });

    return classes.join(' ');
  }
}
