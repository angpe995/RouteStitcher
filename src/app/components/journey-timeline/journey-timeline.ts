import { Component, Input } from '@angular/core';
import { JourneySegment} from '../connection-card/connection.model';
import { NgClass } from '@angular/common';
import { BrandService } from '../../services/brand.service';
import { Brand} from '../connection-card/connection.model';
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

  if (previous.hasSeat && 
     (current.seatInfo?.seat !== previous.seatInfo?.seat || 
      current.seatInfo?.car !== previous.seatInfo?.car)) {
    return 'seat-changed';
  }
  return 'normal';
}
getSegmentClass(index: number, isLast: boolean): string {
  const current = this.segments[index];
  const neighbour = isLast
    ? this.segments[index - 1]
    : this.segments[index + 1];
  const isFirst = index===0;
  const type = current.hasSeat ? 'normal' : 'standing';
  const classes = [type];

  if (!neighbour) {
    return classes.join(' ');
  }

  const sameTrain = current.trainId === neighbour.trainId;
  const sameType = current.hasSeat === neighbour.hasSeat;
  const sameSeat = current.seatInfo === neighbour.seatInfo;

  if (!isFirst && !isLast) {
  const prev = this.segments[index - 1];

  const cutLeft =
    prev.trainId === current.trainId &&
    prev?.seatInfo !== current?.seatInfo;

  const cutRight =
    neighbour.trainId === current.trainId &&
    neighbour?.seatInfo !== current?.seatInfo;

  if (cutLeft && cutRight) {
    classes.push('two', 'cut');
  } else if (cutRight) {
    classes.push(type === 'normal' ? 'even' : 'odd', 'cut');
  } else if (cutLeft) {
    classes.push('odd', 'cut');
  }
}
  else if (sameTrain) {
    if (!sameSeat) {
      if (type === 'normal') {
        classes.push(isLast ? 'odd' : 'even');
      } else {
        classes.push('odd');
      }

      classes.push('cut');
    }
  }

  return classes.join(' ');
}
}
